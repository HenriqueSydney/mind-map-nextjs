'use client'

import { useEffect } from 'react'
import jsMind from 'jsmind'

import { MINDMAPOPTIONS } from '@/lib/mindmapjs'
import './styles.scss'

import mindMapFormatTopic from '@/utils/mapMindFormmater'

type MindMap = {
  id: string
  context: string
  jsonStructure: string
  name: string
}

interface IMindMapContainer {
  mindMap: MindMap
}

export default function MindMapContainer({ mindMap }: IMindMapContainer) {
  useEffect(() => {
    const jsmindContainer = document.querySelector('#jsmind_container')
    const children = jsmindContainer?.querySelectorAll('*')
    const numberOfChildren = children?.length

    const formattedMindMap = JSON.parse(mindMap.jsonStructure)

    if (numberOfChildren === 0) {
      mindMapFormatTopic(formattedMindMap)

      const mindMapInfo = {
        meta: {
          name: 'example',
          author: 'Henrique Sydney Lima',
          version: '0.2',
        },
        format: 'node_array',
        data: formattedMindMap,
      }

      // eslint-disable-next-line new-cap
      const jm = new jsMind(MINDMAPOPTIONS)
      jm.show(mindMapInfo)
    }
  }, [mindMap])
  return <div id="jsmind_container" className="container-jsmind"></div>
}
