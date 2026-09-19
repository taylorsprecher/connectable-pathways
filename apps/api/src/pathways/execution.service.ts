import { Injectable } from '@nestjs/common';

@Injectable()
export class ExecutionService {
  run(pathway: any, input: Record<string, any>) {
    const executionId = `exec_${Date.now()}`;
    const result = {
      executionId,
      status: 'queued',
      pathwayId: pathway.id,
      version: pathway.version,
      input,
      message: 'Execution queued successfully',
    };

    return result;
  }
}
