import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckResult, HealthCheckService, DNSHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private healthCheck: HealthCheckService,
    private dnsHealth: DNSHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.healthCheck.check(
      [
        () => this.dnsHealth.pingCheck("Google", 'https://google.com'),
      ],
    );
  }
}