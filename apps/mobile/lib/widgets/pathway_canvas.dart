import 'package:flutter/material.dart';
import '../controllers/pathway_controller.dart';
import '../models/pathway.dart';

class PathwayCanvas extends StatelessWidget {
  final PathwayController controller;

  const PathwayCanvas({super.key, required this.controller});

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: controller,
      builder: (context, _) {
        return Stack(
          children: [
            CustomPaint(
              painter: ConnectionPainter(controller.edges, controller.nodes),
              size: Size.infinite,
            ),
            ...controller.nodes.map((node) {
              return Positioned(
                left: node.x,
                top: node.y,
                child: GestureDetector(
                  onPanUpdate: (details) {
                    controller.moveNode(
                      node.id,
                      node.x + details.delta.dx,
                      node.y + details.delta.dy,
                    );
                  },
                  child: Container(
                    width: 180,
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      border: Border.all(color: Colors.deepPurple),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          node.label,
                          style: const TextStyle(fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 4),
                        Text(node.type),
                      ],
                    ),
                  ),
                ),
              );
            }).toList(),
          ],
        );
      },
    );
  }
}

class ConnectionPainter extends CustomPainter {
  final List<PathwayEdgeModel> edges;
  final List<PathwayNodeModel> nodes;

  ConnectionPainter(this.edges, this.nodes);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.blueGrey
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;

    for (final edge in edges) {
      final from = nodes.firstWhere((node) => node.id == edge.fromNodeId);
      final to = nodes.firstWhere((node) => node.id == edge.toNodeId);

      final start = Offset(from.x + 180, from.y + 30);
      final end = Offset(to.x, to.y + 30);

      final control1 = Offset(start.dx + 60, start.dy);
      final control2 = Offset(end.dx - 60, end.dy);

      final path = Path()
        ..moveTo(start.dx, start.dy)
        ..cubicTo(control1.dx, control1.dy, control2.dx, control2.dy, end.dx, end.dy);

      canvas.drawPath(path, paint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
