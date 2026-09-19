import { Injectable } from '@nestjs/common';

@Injectable()
export class GraphValidatorService {
  validate(nodes: any[], edges: any[]) {
    const issues: Array<{ type: string; message: string; nodeId?: string }> = [];
    const nodeMap = new Map(nodes.map((node) => [node.id, node]));

    for (const edge of edges) {
      if (!nodeMap.has(edge.fromNodeId)) {
        issues.push({
          type: 'missing_source_node',
          message: `Source node ${edge.fromNodeId} does not exist`,
          nodeId: edge.fromNodeId,
        });
      }

      if (!nodeMap.has(edge.toNodeId)) {
        issues.push({
          type: 'missing_target_node',
          message: `Target node ${edge.toNodeId} does not exist`,
          nodeId: edge.toNodeId,
        });
      }
    }

    for (const node of nodes) {
      if (node.type === 'decision' && (!node.inputPorts || node.inputPorts.length === 0)) {
        issues.push({
          type: 'decision_missing_input',
          message: `Decision node ${node.id} requires an input port`,
          nodeId: node.id,
        });
      }

      if (node.type === 'action' && (!node.outputPorts || node.outputPorts.length === 0)) {
        issues.push({
          type: 'action_missing_output',
          message: `Action node ${node.id} requires an output port`,
          nodeId: node.id,
        });
      }
    }

    const cycle = this.detectCycle(nodes, edges);
    if (cycle) {
      issues.push({
        type: 'cycle_detected',
        message: `Cycle detected: ${cycle.join(' -> ')}`,
      });
    }

    return {
      valid: issues.length === 0,
      issues,
    };
  }

  private detectCycle(nodes: any[], edges: any[]) {
    const adjacency = new Map<string, string[]>();
    const nodeIds = new Set(nodes.map((n) => n.id));

    for (const node of nodes) {
      adjacency.set(node.id, []);
    }

    for (const edge of edges) {
      if (nodeIds.has(edge.fromNodeId) && nodeIds.has(edge.toNodeId)) {
        const next = adjacency.get(edge.fromNodeId) || [];
        next.push(edge.toNodeId);
        adjacency.set(edge.fromNodeId, next);
      }
    }

    const visited = new Set<string>();
    const stack = new Set<string>();
    const path: string[] = [];

    const dfs = (nodeId: string): boolean | string[] => {
      visited.add(nodeId);
      stack.add(nodeId);
      path.push(nodeId);

      const neighbors = adjacency.get(nodeId) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          const result = dfs(neighbor);
          if (result !== false) {
            return result;
          }
        } else if (stack.has(neighbor)) {
          const startIndex = path.indexOf(neighbor);
          return [...path.slice(startIndex), neighbor];
        }
      }

      stack.delete(nodeId);
      path.pop();
      return false;
    };

    for (const node of nodes) {
      if (!visited.has(node.id)) {
        const result = dfs(node.id);
        if (result !== false && result !== undefined) {
          return result as string[];
        }
      }
    }

    return null;
  }
}
