import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ExecutionService } from './execution.service';
import { GraphValidatorService } from './graph-validator.service';

export type PathwayNode = {
  id: string;
  type: string;
  label: string;
  x: number;
  y: number;
  inputPorts: string[];
  outputPorts: string[];
  config?: Record<string, any>;
};

export type PathwayEdge = {
  id: string;
  fromNodeId: string;
  fromPortId: string;
  toNodeId: string;
  toPortId: string;
  condition?: string;
};

export type Pathway = {
  id: string;
  workspaceId: string;
  name: string;
  description?: string;
  status: 'draft' | 'active' | 'archived';
  version: number;
  nodes: PathwayNode[];
  edges: PathwayEdge[];
};

@Injectable()
export class PathwaysService {
  private readonly pathways = new Map<string, Pathway>();

  constructor(
    private readonly validator: GraphValidatorService,
    private readonly executionService: ExecutionService,
  ) {}

  create(dto: Partial<Pathway>) {
    const pathway: Pathway = {
      id: randomUUID(),
      workspaceId: dto.workspaceId || 'ws_default',
      name: dto.name || 'Untitled Pathway',
      description: dto.description || '',
      status: dto.status || 'draft',
      version: dto.version || 1,
      nodes: dto.nodes || [],
      edges: dto.edges || [],
    };

    this.pathways.set(pathway.id, pathway);
    return pathway;
  }

  findOne(id: string) {
    const pathway = this.pathways.get(id);
    if (!pathway) {
      throw new NotFoundException('Pathway not found');
    }
    return pathway;
  }

  addNode(id: string, node: Partial<PathwayNode>) {
    const pathway = this.findOne(id);
    const nextNode: PathwayNode = {
      id: node.id || randomUUID(),
      type: node.type || 'action',
      label: node.label || 'Unnamed node',
      x: node.x || 0,
      y: node.y || 0,
      inputPorts: node.inputPorts || [],
      outputPorts: node.outputPorts || [],
      config: node.config || {},
    };

    pathway.nodes.push(nextNode);
    return nextNode;
  }

  addEdge(id: string, edge: Partial<PathwayEdge>) {
    const pathway = this.findOne(id);
    const nextEdge: PathwayEdge = {
      id: edge.id || randomUUID(),
      fromNodeId: edge.fromNodeId || '',
      fromPortId: edge.fromPortId || '',
      toNodeId: edge.toNodeId || '',
      toPortId: edge.toPortId || '',
      condition: edge.condition || undefined,
    };

    pathway.edges.push(nextEdge);
    return nextEdge;
  }

  validate(id: string) {
    const pathway = this.findOne(id);
    return this.validator.validate(pathway.nodes, pathway.edges);
  }

  run(id: string, input: Record<string, any>) {
    const pathway = this.findOne(id);
    return this.executionService.run(pathway, input);
  }

  delete(id: string) {
    this.pathways.delete(id);
    return { deleted: true, id };
  }
}
