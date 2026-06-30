


export class Scheduler {
	constructor() {
		this.tasks = []	
	}
	add(fn, interval, now,random, oneShot) {
		if (now) { 
				this.tasks.push({fn, now, oneShot})	
		} else {
				this.tasks.push({fn,  timer: new Timer(interval, random), now, oneShot})	
		}
	}
	tick(timestamp) {
		for (let i = 0; i < this.tasks.length; i++) {
			let task = this.tasks[i]	
			if (task.now) {
				task.fn()		
				continue
			}
			if (task.timer.tick(timestamp)) {
	
				task.fn()	
				if (task.oneShot) {
					this.remove(i)		
				}

			}	
		}
	}
	remove(index) {
		this.tasks.splice(index, 1)	
	}
}







export class Timer {
	constructor(interval, random = false) {
		this.interval = interval; 
		this.lastTime = null;
		this.isRandom = random; 
	}

	
	tick(timestamp) {
		if (!this.lastTime) {
			this.lastTime = timestamp;	1000	
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
