import sys
import os
import glob
import argparse
import multiprocessing
from concurrent.futures import ProcessPoolExecutor
from PIL import Image
import numpy as np

def convert_png_to_svg(input_path, output_path, scale_factor):
    # 1. Open image
    img = Image.open(input_path).convert('RGBA')
    arr = np.array(img)
    height, width = arr.shape[:2]
    
    svg_width = width * scale_factor
    svg_height = height * scale_factor
    
    # 2. Build SVG in memory (much faster than writing line-by-line)
    svg_lines = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{svg_width}" height="{svg_height}" '
        f'viewBox="0 0 {svg_width} {svg_height}" shape-rendering="crispEdges">\n'
    ]
    
    # 3. Process row by row to merge adjacent pixels (Run-Length Encoding)
    for y in range(height):
        x = 0
        while x < width:
            r, g, b, a = arr[y, x]
            
            # Skip fully transparent pixels
            if a == 0:
                x += 1
                continue
            
            # Find how many consecutive pixels have the EXACT same color
            start_x = x
            target_color = (r, g, b, a)
            
            # Fast pure-Python comparison (much faster than numpy functions in a loop)
            while x < width:
                px = arr[y, x]
                if px[0] == r and px[1] == g and px[2] == b and px[3] == a:
                    x += 1
                else:
                    break
            
            # Calculate scaled dimensions
            rect_width = (x - start_x) * scale_factor
            rect_x = start_x * scale_factor
            rect_y = y * scale_factor
            rect_height = 1 * scale_factor
            
            opacity = a / 255.0
            svg_lines.append(
                f'<rect x="{rect_x}" y="{rect_y}" width="{rect_width}" height="{rect_height}" '
                f'fill="rgb({r},{g},{b})" fill-opacity="{opacity:.3f}" />\n'
            )
            
    svg_lines.append('</svg>\n')
    
    # 4. Write to file all at once
    with open(output_path, 'w') as f:
        f.writelines(svg_lines)

def process_file(args):
    """Wrapper function for multiprocessing"""
    png_file, scale_factor = args
    svg_file = os.path.splitext(png_file)[0] + '.svg'
    try:
        convert_png_to_svg(png_file, svg_file, scale_factor)
        return f"✅ Success: {os.path.basename(png_file)} -> {os.path.basename(svg_file)}"
    except Exception as e:
        return f"❌ Failed: {os.path.basename(png_file)} | Error: {e}"

if __name__ == "__main__":
    # Setup command line arguments
    parser = argparse.ArgumentParser(description="Batch convert PNGs to highly optimized, scalable SVGs.")
    parser.add_argument("folder", help="Path to the folder containing PNG files.")
    parser.add_argument("--scale", type=int, default=1, help="Visual scale factor (e.g., 4 makes each pixel a 4x4 block). Default is 1.")
    args = parser.parse_args()
    
    folder_path = args.folder
    scale_factor = max(1, args.scale) # Prevent 0 or negative scaling
    
    if not os.path.isdir(folder_path):
        print(f"Error: '{folder_path}' is not a valid directory.")
        sys.exit(1)
        
    png_files = glob.glob(os.path.join(folder_path, '*.png'))
    if not png_files:
        print(f"No PNG files found in '{folder_path}'.")
        sys.exit(0)
        
    cpu_cores = multiprocessing.cpu_count()
    print(f"📁 Found {len(png_files)} PNG file(s).")
    print(f"🔍 Visual Scale: {scale_factor}x | 🚀 Using {cpu_cores} CPU cores for parallel processing...\n")
    
    # Prepare tasks for multiprocessing
    tasks = [(f, scale_factor) for f in png_files]
    
    # Process images in parallel
    with ProcessPoolExecutor(max_workers=cpu_cores) as executor:
        results = executor.map(process_file, tasks)
        for res in results:
            print(res)
            
    print("\n🎉 All done!")
