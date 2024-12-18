class HashMap {
	constructor(loadFactor = 0.75, initialCapacity = 16) {
		this.loadFactor = loadFactor
		this.capacity = initialCapacity
		this.size = 0
		this.buckets = Array(this.capacity).fill(null)
	}

	hash(key) {
		let hashCode = 0

		const primeNumber = 31
		for (let i = 0; i < key.length; i++) {
			hashCode = primeNumber * hashCode + key.charCodeAt(i)
		}

		return hashCode % this.capacity
	}

	set(key, value) {
		const index = this.hash(key)

		if (!this.buckets[index]) {
			this.buckets[index] = this.listNode(key, value)
		} else {
			let current = this.buckets[index]

			// Go through the bucket
			while (current) {
				if (current.key == key) {
					current.value = value // Overwrite
					return
				}

				if (!current.next) {
					current.next = this.listNode(key, value) // Make new node
					break
				}

				current = current.next
			}
		}

		this.size++

		if (this.size >= this.capacity * this.loadFactor) {
			this.resize()
		}
	}

	resize() {
		this.capacity *= 2
		const oldBuckets = this.buckets
		this.buckets = new Array(this.capacity).fill(null)

		for (let i = 0; i < oldBuckets.length; i++) {
			let current = oldBuckets[i]
			while (current) {
				this.set(current.key, current.value)
				current = current.next
			}
		}
	}

	get(key) {
		const index = this.hash(key)

		if (!this.buckets[index]) {
			return null
		}

		let current = this.buckets[index]

		while (current) {
			if (current.key === key) {
				return current.value
			}

			current = current.next
		}

		return null
	}

	has(key) {
		const index = this.hash(key)

		if (!this.buckets[index]) {
			return false
		}

		let current = this.buckets[index]

		while (current) {
			if (current.key === key) {
				return true
			}

			current = current.next
		}

		return false
	}

	remove(key) {
		const index = this.hash(key)

		if (!this.buckets[index]) {
			return false
		}

		let previous = null
		let current = this.buckets[index]

		while (current) {
			if (current.key === key) {
				// for the first one
				if (!previous) this.buckets[index] = current.next
				else previous.next = current.next

				this.size--
				return true
			}

			previous = current
			current = current.next
		}

		return false
	}

	length() {
		return this.size
	}

	clear() {
		this.buckets = Array(this.capacity).fill(null)
		this.size = 0
		this.capacity = 16
	}

	keys() {
		let keysArray = []

		this.buckets.forEach((bucket) => {
			while (bucket) {
				keysArray.push(bucket.key)
				bucket = bucket.next
			}
		})

		return keysArray
	}

	values() {
		let valuesArray = []

		this.buckets.forEach((bucket) => {
			while (bucket) {
				valuesArray.push(bucket.value)
				bucket = bucket.next
			}
		})

		return valuesArray
	}

	entries() {
		let pairsArray = []

		this.buckets.forEach((bucket) => {
			while (bucket) {
				pairsArray.push([bucket.key, bucket.value])
				bucket = bucket.next
			}
		})

		return pairsArray
	}

	listNode(key, value) {
		return {
			key,
			value,
			next: null,
		}
	}

	// temporary code
	bucket() {
		return this.buckets
	}
}

const test = new HashMap()
test.set("apple", "red")
test.set("banana", "yellow")
test.set("carrot", "orange")
test.set("dog", "brown")
test.set("elephant", "gray")
test.set("frog", "green")
test.set("grape", "purple")
test.set("hat", "black")
test.set("ice cream", "white")
test.set("jacket", "blue")
test.set("kite", "pink")
test.set("lion", "golden")

console.log(test.get("apples"))
console.log(test.has("apple"))
console.log(test.remove("apples"))
test.set("lion", "gold")
console.log(test.keys())
console.log(test.values())
console.log(test.entries())
// console.log(test.bucket())
