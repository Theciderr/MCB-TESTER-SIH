# API / Application Contracts

## 1. Conventions
Base path: `/api`

All request bodies and responses are JSON except file downloads.

Error:
```json
{
  "error": {
    "code": "TEST_PRECHECK_FAILED",
    "message": "Current sensor is offline",
    "details": {}
  }
}
```

## 2. Auth
### `POST /api/auth/login`
```json
{
  "email": "operator@example.com",
  "password": "..."
}
```

### `POST /api/auth/logout`

### `GET /api/auth/me`

## 3. MCB
### `GET /api/mcbs`
Filters:
- manufacturer
- curve
- ratedCurrent
- active

### `GET /api/mcbs/:id`

### `POST /api/mcbs`

### `PATCH /api/mcbs/:id`

## 4. Test
### `POST /api/tests`
```json
{
  "mcbModelId": "uuid",
  "testProfileId": "uuid",
  "batchId": "BATCH-2026-09",
  "serialNumber": "MCB-00042",
  "mode": "SIMULATION"
}
```

### `POST /api/tests/:id/precheck`

### `POST /api/tests/:id/start`
The server verifies:
- authorization;
- mode;
- device health;
- interlocks;
- current limits;
- test profile.

### `POST /api/tests/:id/stop`

### `GET /api/tests/:id`

### `GET /api/tests/:id/telemetry`

### `GET /api/tests/:id/events`

### `GET /api/tests/:id/result`

## 5. Real-time telemetry
Preferred:
`GET /api/tests/:id/stream` via SSE.

Event:
```json
{
  "type": "telemetry",
  "data": {
    "timestamp": "2026-10-05T13:30:10.250Z",
    "voltageV": 230.8,
    "currentA": 8.14,
    "terminalTempC": 42.1,
    "contactState": "CLOSED"
  }
}
```

Trip event:
```json
{
  "type": "trip",
  "data": {
    "timestamp": "2026-10-05T13:30:11.120Z",
    "tripTimeMs": 870.0
  }
}
```

## 6. Device
### `GET /api/devices`
### `GET /api/devices/:id`
### `GET /api/devices/:id/health`
### `POST /api/devices/:id/heartbeat`

Do not expose arbitrary device command execution.

## 7. Reports
### `POST /api/tests/:id/report`
Returns report metadata.

### `GET /api/reports/:id`
Returns/downloads the generated report.

### `GET /api/tests/:id/export.csv`

## 8. Analytics
### `GET /api/analytics/summary?range=30d`
Response:
```json
{
  "totalTests": 120,
  "passRate": 0.91,
  "meanTripMs": 172.2,
  "failedTests": 11
}
```

### `GET /api/analytics/curves`
### `GET /api/analytics/batches/:batchId`

## 9. AI Inspector
### `POST /api/ai/analyze-test`
```json
{
  "testId": "uuid"
}
```

Response:
```json
{
  "classification": "marginal",
  "anomalyScore": 0.78,
  "confidence": 0.91,
  "reasons": [
    "Trip latency is above the batch median",
    "Thermal rise is steeper than the golden signature"
  ],
  "evidence": [
    {
      "metric": "tripTimeMs",
      "observed": 412,
      "expectedMax": 250
    }
  ]
}
```

The AI endpoint is advisory. The deterministic rule engine remains the source of the PASS/FAIL verdict.
