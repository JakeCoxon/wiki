export default function mergeClasses() {
    return Array.prototype.slice.call(arguments).filter(x => !!x).join(" ")
}