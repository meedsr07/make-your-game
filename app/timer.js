export class Timer {
	constructor(interval, random = false) {
		this.interval = interval; 
		this.lastTime = null;
		this.isRandom = random; 
	}
	
	tick(timestamp) {
		if (!this.lastTime) {
			this.lastTime = timestamp;		
			return false 
		}
		if (timestamp-this.lastTime >= this.interval) {
			this.lastTime = timestamp 
			if (this.isRandom) this.interval = 15000 + Math.random() * 15000 
			return true
		}
		
	}
	edit(interval) {
		this.interval = interval 
	}
}
