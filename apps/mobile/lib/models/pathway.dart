import 'package:flutter/material.dart';

class PathwayNodeModel {
  final String id;
  final String type;
  final String label;
  final double x;
  final double y;
  final List<String> inputPorts;
  final List<String> outputPorts;
  final Map<String, dynamic> config;

  PathwayNodeModel({
    required this.id,
    required this.type,
    required this.label,
    required this.x,
    required this.y,
    this.inputPorts = const [],
    this.outputPorts = const [],
    this.config = const {},
  });

  Map<String, dynamic> toJson() => {
        'id': id,
        'type': type,
        'label': label,
        'x': x,
        'y': y,
        'inputPorts': inputPorts,
        'outputPorts': outputPorts,
        'config': config,
      };
}

class PathwayEdgeModel {
  final String id;
  final String fromNodeId;
  final String fromPortId;
  final String toNodeId;
  final String toPortId;
  final String? condition;

  PathwayEdgeModel({
    required this.id,
    required this.fromNodeId,
    required this.fromPortId,
    required this.toNodeId,
    required this.toPortId,
    this.condition,
  });

  Map<String, dynamic> toJson() => {
        'id': id,
        'fromNodeId': fromNodeId,
        'fromPortId': fromPortId,
        'toNodeId': toNodeId,
        'toPortId': toPortId,
        'condition': condition,
      };
}
