export default function getIndex(items, mergeInto = {}) {
  return items.reduce(
    (index, item) => ({ ...index, [item._id]: item }),
    mergeInto
  )
}
