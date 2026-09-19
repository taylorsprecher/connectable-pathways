import 'package:flutter/material.dart';
import '../models/pathway.dart';

class PathwayController extends ChangeNotifier {
  final List<PathwayNodeModel> nodes = [];
  final List<PathwayEdgeModel> edges = [];

  void addNode(PathwayNodeModel node) {
    nodes.add(node);
    notifyListeners();
  }

  void addEdge(PathwayEdgeModel edge) {
    edges.add(edge);
    notifyListeners();
  }

  void moveNode(String id, double x, double y) {
    final index = nodes.indexWhere((node) => node.id == id);
    if (index == -1) return;

    final node = nodes[index];
    nodes[index] = PathwayNodeModel(
      id: node.id,
      type: node.type,
      label: node.label,
      x: x,
      y: y,
      inputPorts: node.inputPorts,
      outputPorts: node.outputPorts,
      config: node.config,
    );

    notifyListeners();
  }
}
