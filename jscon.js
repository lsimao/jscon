if (WSH.FullName.match(/.*wscript.exe$/i)) {
	WSH.CreateObject("WScript.Shell").Run(WSH.fullname.replace(/.*WScript.exe$/i, "CScript.exe")+" \""+WSH.ScriptFullName+"\"");
	WScript.Quit();
}

//Loads unpluggable load function
load=function(file){
	var f=WSH.CreateObject("Scripting.FileSystemObject").OpenTextFile(file,1,-2);
	eval(f.ReadAll());
	f.Close();
};

WSH.StdOut.Write("> ");
while (!WSH.StdIn.AtEndOfStream){
	
	//Needed to hide _jscon_stringify
	(function (_jscon_stringify) {
		try {
			(function (_jscon_result) {
				WSH.StdOut.Write("["+typeof _jscon_result+"] ");
				WSH.StdOut.WriteLine(_jscon_stringify(_jscon_result));
			})(eval("("+WSH.StdIn.ReadLine()+")"));
		
		} catch(_jscon_result) {
			WSH.StdOut.WriteLine("[exception] "+_jscon_stringify(_jscon_result));
		}
	})(function(v){
		//v:value,s:stack to check recurrence,a:"obj_in_stack" function
		return (function str(v,s,a) {
			var ret="", rec;
			if (v === null) return "null";
			if (v instanceof RegExp) return String(v);
			/*if (v instanceof Array) {
				s=s.concat([v]);
				for(var i in v) ret+=(ret==""?"":",")+(a(v[i],s)?"recursive":str(v[i],s,a));
				return "["+ret+"]";
			}*/
			if (typeof v == "string" || v instanceof String) return "\""+v.replace(/\x22/g,"\\\"").replace(/\x5c/g,"\\\\").replace(/\x00/g,"\\0").replace(/\x08/g,"\\b").replace(/\x09/g,"\\t").replace(/\x0a/g,"\\n").replace(/\x0c/g,"\\f").replace(/\x0d/g,"\\r").replace(/\x2f/g,"\\/")+"\"";
			if (typeof v == "function" || v instanceof Function) return "function";
			if (typeof v == "object" || v instanceof Object) {
				s=s.concat([v]);
				for(var m in v) ret+=(ret==""?"":",")+str(m)+":"+(a(v[m],s)?"recursive":str(v[m],s,a));
				return "{"+ret+"}";
			}
			return ""+v;
		})(v,[],function(o,s){for(var i=0;i<s.length;++i)if(s[i]===o)return 1})
	});
	WSH.StdOut.Write("> ");
}
