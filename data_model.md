# Data Model

## 1. Core entities

### User
```text
id UUID PK
name
email UNIQUE
role
password_hash nullable
created_at
updated_at
```

### MCBModel
```text
id UUID PK
manufacturer
model_name
rated_current_a
curve_type        // B | C | D
poles
rated_voltage_v
breaking_capacity_ka nullable
standard_reference
description
active
created_at
updated_at
```

### TestProfile
```text
id UUID PK
mcb_model_id FK
name
mode              // 1.13In | 1.45In | 2.55In | instantaneous | custom
target_multiplier nullable
target_current_a nullable
min_trip_ms nullable
max_trip_ms nullable
max_duration_ms nullable
temperature_limit_c nullable
rules_json
version
active
```

### TestSession
```text
id UUID PK
test_code UNIQUE
mcb_model_id FK
test_profile_id FK
operator_id FK
batch_id nullable
serial_number nullable
qr_code nullable
mode                // SIMULATION | LIVE
status
started_at
completed_at nullable
result nullable       // PASS | FAIL | NO_TRIP | ABORTED
failure_reason nullable
```

### TelemetryPoint
```text
id BIGSERIAL PK
test_session_id FK
timestamp
voltage_v
current_a
frequency_hz nullable
terminal_temp_c nullable
ambient_temp_c nullable
contact_state nullable
```

### TestEvent
```text
id UUID PK
test_session_id FK
timestamp
type
payload_json
```

Event examples:
- PRECHECK_PASSED
- SOFT_START
- TARGET_REACHED
- TRIP_DETECTED
- TIMEOUT
- SAFETY_STOP
- SENSOR_FAULT

### TestResult
```text
id UUID PK
test_session_id UNIQUE FK
measured_trip_ms nullable
peak_current_a
mean_current_a
max_terminal_temp_c nullable
max_ambient_temp_c nullable
rule_result_json
ai_result_json nullable
final_verdict
finalized_at
```

### Device
```text
id UUID PK
device_code UNIQUE
type
ip_address nullable
firmware_version
status
last_seen_at
created_at
```

### Sensor
```text
id UUID PK
device_id FK
type
model
channel
status
calibration_factor
last_reading
updated_at
```

### Alert
```text
id UUID PK
severity
source
title
message
test_session_id nullable
device_id nullable
status
acknowledged_by nullable
created_at
acknowledged_at nullable
```

### Report
```text
id UUID PK
test_session_id FK
report_number UNIQUE
type
storage_key nullable
sha256
created_by FK
created_at
```

### AuditLog
```text
id BIGSERIAL PK
actor_id nullable
action
resource_type
resource_id
metadata_json
ip_hash nullable
created_at
```

## 2. Relationships

```text
User 1----N TestSession
MCBModel 1----N TestProfile
MCBModel 1----N TestSession
TestProfile 1----N TestSession
TestSession 1----N TelemetryPoint
TestSession 1----N TestEvent
TestSession 1----1 TestResult
Device 1----N Sensor
Device 1----N Alert
TestSession 1----N Alert
TestSession 1----N Report
User 1----N AuditLog
```

## 3. Data integrity
- Store the test-profile version used by each test.
- Never recompute historical verdicts from a changed profile.
- Use UTC timestamps.
- Index `test_code`, `serial_number`, `batch_id`, `created_at`, `status`.
- Partition telemetry only if volume later requires it.

## 4. Demo seed data
Seed:
- 6–10 MCB models;
- B/C/D curves;
- multiple ratings;
- 10+ historical tests;
- 1 simulated ESP32 device;
- pass/fail/marginal examples;
- 2–3 alerts;
- golden curves for selected models.
