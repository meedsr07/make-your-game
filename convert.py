import sys
import os
import glob
from PIL import Image
import numpy as np

def convert_png_to_svg(input_path, output_path):
    # 1. Open image and ensure it has an Alpha (transparency) channel
    img = Image.open(input_path).convert('RGBA')
    arr = np.array(img)
    width, height = img.size

    # 2. Fast NumPy method: Find all coordinates where alpha (index 3) is > 0
    y_coords, x_coords = np.where(arr[:, :, 3] > 0)

    # 3. Write to SVG file
    with open(output_path, 'w') as f:
        # SVG header with crispEdges to prevent anti-aliasing gaps between pixels
        f.write(f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" shape-rendering="crispEdges">\n')
        
        # Write a 1x1 rectangle for each non-transparent pixel
        for y, x in zip(y_coords, x_coords):
            r, g, b, a = arr[y, x]
            opacity = a / 255.0  # SVG opacity expects a value between 0.0 and 1.0
            
            f.write(f'<rect x="{x}" y="{y}" width="1" height="1" fill="rgb({r},{g},{b})" fill-opacity="{opacity:.3f}" />\n')
        
        f.write('</svg>\n')

if __name__ == "__main__":
    # 1. Check if the user provided a folder path
    if len(sys.argv) != 2:
        print("Usage: python3 convert_folder.py <folder_path>")
        sys.exit(1)
        
    folder_path = sys.argv[1]
    
    # 2. Verify the folder exists
    if not os.path.isdir(folder_path):
        print(f"Error: '{folder_path}' is not a valid directory.")
        sys.exit(1)
        
    # 3. Find all .png files in the specified folder
    search_pattern = os.path.join(folder_path, '*.png')
    png_files = glob.glob(search_pattern)
    
    if not png_files:
        print(f"No PNG files found in '{folder_path}'.")
        sys.exit(0)
        
    print(f"Found {len(png_files)} PNG file(s) to convert.\n")
    
    # 4. Loop through and convert each file
    for png_file in png_files:
        # Create the output SVG path by replacing the .png extension with .svg
        svg_file = os.path.splitext(png_file)[0] + '.svg'
        
        print(f"Processing: {os.path.basename(png_file)} ...", end=" ")
        try:
            convert_png_to_svg(png_file, svg_file)
            print(f"Done -> {os.path.basename(svg_file)}")
        except Exception as e:
            print(f"Failed! Error: {e}")
            
    print("\nConversion complete!")
