export function cutString(str:any, len1:any, len2: any) {
	let strlen = str.length
	if ( strlen < len1+len2) return str
	let symbol = '...'
	str = str.substr(0,len1) + symbol + str.substr(strlen-len2)

	return str
}