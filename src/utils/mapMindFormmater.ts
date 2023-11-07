export default function mindMapFormatTopic(data: any) {
  data.forEach((item: any) => {
    if (item.resumo !== undefined) {
      item.topic = `<span class="text-mindmap tooltip">${item.topic}<span class="tooltiptext">${item.resumo}</span></span>`
    } else {
      item.topic = `<span class="text-mindmap">${item.topic}</span>`
    }
  })

  return data
}
