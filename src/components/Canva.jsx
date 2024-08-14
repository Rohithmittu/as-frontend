import React, { useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  ConnectionLineType,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Card from "./card";
// import NodeResizer from "./NodeResizer";


const Canva = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const addCard = () => {
    const text = prompt("Enter the text for the card:");
    if (!text) return;

    const id = Date.now().toString();
    const newNode = {
      id,
      data: {
        label: (
          <Card
            text={text}
            onShowMore={() =>
              setSelectedCard({
                id,
                fullText: text,
              })
            }
          />
        ),
      },
      position: { x: 100, y: 100 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const onConnect = (params) =>
    setEdges((eds) =>
      addEdge({ ...params, type: ConnectionLineType.SmoothStep }, eds)
    );

  return (
    <ReactFlowProvider>
      {/* <NodeResizer minWidth={100} minHeight={30} /> */}
      <div
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "auto",
          position: "relative",
        }}
      >
        <button onClick={addCard}>Add Card</button>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          style={{ width: "100%", height: "100%" }}
          nodesDraggable
          panOnDrag
        >
          <Background />
          <Controls />
          {/* <NodeResizer minWidth={100} minHeight={30} /> */}
        </ReactFlow>

        {selectedCard && (
          <div
            className="popup"
            style={{
              position: "absolute",
              top: 50,
              left: 50,
              backgroundColor: "white",
              padding: 20,
              borderRadius: "5px",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
            }}
          >
            {/* <NodeResizer data={data} /> */}
            <h3>Card Details</h3>
            <p>{selectedCard.fullText}</p>
            <button onClick={() => setSelectedCard(null)}>Close</button>
          </div>
        )}
      </div>
    </ReactFlowProvider>
  );
};

export default Canva;
