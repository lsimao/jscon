//Iterates over items of enumerable objects, characters in strings and members in objects.
Object.prototype=Object.prototype||{};
Object.prototype.forEach=function(f) {
	var e, r;
	
	//Array case
	if (this instanceof Array) {
		for(e in this) if (e>=0 && e<this.length) if (r=f(this[e],e)) return r;
		return;
	}
	
	//Enumerator case
	try {
		e=new Enumerator(this);
	} catch (x) {}
	if(e) {
		for(;!e.atEnd();e.moveNext()) if (r=f(e.item())) return r;
		return
	}
	
	//String case
	if (this instanceof String) return this.split("").forEach(f);
	
	//Generic object
	for(e in this) if (this.hasOwnProperty(e)) if (r=f(this[e],e)) return r;
}

Array.prototype=Array.prototype||{};
Array.prototype.map=function(f) {for(var i in this) if (i>=0 && i<this.length) this[i]=f(this[i],i)}

e=function(v) {WSH.Echo(v)}