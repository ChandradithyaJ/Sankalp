// Custom Zip Function

const zip = (list1, list2) => {
    const zipped = []

    for (let i = 0; i < list1.length; i++) {
        const newObject = {
            one: list1[i],
            two: list2[i]
        }
        zipped.push(newObject)
    }
    return zipped
}

export default zip