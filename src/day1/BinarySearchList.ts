export default function bs_list(haystack: number[], needle: number): boolean {
    let hi = haystack.length - 1;
    let lo = 0;
    let med = Math.floor(hi / 2);

    while (lo < hi) {
        const val = haystack[med];
        if (val === needle) {
            return true;
        }
        if (needle < val) {
            hi = med - 1;
        } else {
            lo = med + 1;
        }
        med = Math.floor((lo + hi) / 2);
    }
   
    return false;
}
