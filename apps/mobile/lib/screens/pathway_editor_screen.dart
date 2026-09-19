import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../controllers/pathway_controller.dart';
import '../models/pathway.dart';

class PathwayEditorScreen extends StatelessWidget {
  const PathwayEditorScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = context.watch<PathwayController>();

    if (controller.nodes.isEmpty) {
      controller.addNode(
        PathwayNodeModel(
          id: 'start',
          type: 'start',
          label: 'Start',
          x: 60,
          y: 100,
          outputPorts: ['out1'],
        ),
      );
      controller.addNode(
        PathwayNodeModel(
          id: 'decision',
          type: 'decision',
          label: 'Qualified?',
          x: 320,
          y: 120,
          inputPorts: ['in1'],
          outputPorts: ['yes', 'no'],
        ),
      );
      controller.addNode(
        PathwayNodeModel(
          id: 'notify',
          type: 'action',
          label: 'Send email',
          x: 620,
          y: 80,
          inputPorts: ['in1'],
        ),
      );
      controller.addEdge(
        PathwayEdgeModel(
          id: 'e1',
          fromNodeId: 'start',
          fromPortId: 'out1',
          toNodeId: 'decision',
          toPortId: 'in1',
        ),
      );
      controller.addEdge(
        PathwayEdgeModel(
          id: 'e2',
          fromNodeId: 'decision',
          fromPortId: 'yes',
          toNodeId: 'notify',
          toPortId: 'in1',
          condition: 'qualified == true',
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Connectable Pathways'),
        actions: [
          IconButton(
            onPressed: () {},
            icon: const Icon(Icons.check_circle_outline),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          controller.addNode(
            PathwayNodeModel(
              id: 'node_${DateTime.now().millisecondsSinceEpoch}',
              type: 'action',
              label: 'Action',
              x: 100 + (controller.nodes.length * 30),
              y: 250 + (controller.nodes.length * 20),
              inputPorts: ['in1'],
              outputPorts: ['out1'],
            ),
          );
        },
        child: const Icon(Icons.add),
      ),
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: PathwayCanvas(controller: controller),
            ),
            Container(
              padding: const EdgeInsets.all(12),
              color: Colors.grey.shade100,
              child: Row(
                children: [
                  ElevatedButton.icon(
                    onPressed: () {},
                    icon: const Icon(Icons.save),
                    label: const Text('Save'),
                  ),
                  const SizedBox(width: 12),
                  ElevatedButton.icon(
                    onPressed: () {},
                    icon: const Icon(Icons.play_arrow),
                    label: const Text('Run'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
