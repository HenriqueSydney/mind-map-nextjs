export const MINDMAPOPTIONS = {
  container: 'jsmind_container',
  editable: true,
  theme: null,
  mode: 'full',
  support_html: true,
  view: {
    engine: 'canvas', // engine for drawing lines between nodes in the mindmap
    hmargin: 10, // Minimum horizontal distance of the mindmap from the outer frame of the container
    vmargin: 10, // Minimum vertical distance of the mindmap from the outer frame of the container
    line_width: 2, // thickness of the mindmap line
    line_color: '#E1E1E6', // Thought mindmap line color
    line_style: 'curved', // line style, straight or curved
    draggable: true, // Drag the mind map with your mouse, when it's larger that the container
    hide_scrollbars_when_draggable: true, // Hide container scrollbars, when mind map is larger than container and draggable option is true.
    node_overflow: 'wrap', // Text overflow style in node
  },
  layout: {
    hspace: 80, // Horizontal spacing between nodes
    vspace: 50, // Vertical spacing between nodes
    pspace: 40, // Horizontal spacing between node and connection line (to place node expander)
    cousin_space: 20, // Additional vertical spacing between child nodes of neighbor nodes
  },
}
