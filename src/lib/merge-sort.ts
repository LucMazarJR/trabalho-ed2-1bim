export default function mergeSort<T>(vetor: T[], fnComp: (a: T, b: T) => boolean): T[] {
    if(vetor.length < 2) return vetor

    const meio = Math.floor(vetor.length / 2)
    let vetEsq = vetor.slice(0, meio)
    let vetDir = vetor.slice(meio)

    vetEsq = mergeSort(vetEsq, fnComp)
    vetDir = mergeSort(vetDir, fnComp)

    let posEsq = 0, posDir = 0
    const vetRes: T[] = []

    while(posEsq < vetEsq.length && posDir < vetDir.length) {
        if(fnComp(vetEsq[posEsq], vetDir[posDir])) {
            vetRes.push(vetEsq[posEsq])
            posEsq++
        }
        else {
            vetRes.push(vetDir[posDir])
            posDir++
        }
    }
    
    let sobra: T[]

    if(posEsq < vetEsq.length) {
        sobra = vetEsq.slice(posEsq)
    }
    else {
        sobra = vetDir.slice(posDir)
    }

    return [...vetRes, ...sobra]
}