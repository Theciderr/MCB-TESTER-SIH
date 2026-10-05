# Security

## 1. Threat model
The system controls/monitors a device associated with high-current electrical testing. The most important security objective is preventing an unauthorized or malformed web action from causing a physical unsafe state.

The source deck itself identifies isolation, fusing, interlocks, enclosed high-current sections, emergency stop, hardware current limits and fault lockout as safety mitigations. fileciteturn0file0L81-L89

## 2. Authentication
- Email/password or institutional SSO for hackathon.
- Secure HTTP-only session cookie.
- Password hashing with Argon2id/bcrypt if passwords are implemented.
- Session expiry.
- Logout invalidation.

## 3. Authorization
Roles:
- `OPERATOR`
- `QC_ENGINEER`
- `SUPERVISOR`
- `ADMIN`
- `VIEWER`

Permission examples:
```text
test:create
test:start
test:stop
test:view
test:export
mcb:manage
device:view
device:command
report:generate
settings:manage
audit:view
```

## 4. Hardware command security
Never expose ESP32 command endpoints directly to the public internet.

Preferred:
```text
Browser -> authenticated backend -> local gateway -> device
```

Every command:
- authenticated;
- authorized;
- schema-validated;
- bounded by server-side limits;
- assigned a command ID;
- logged;
- rejected if safety state is invalid.

The gateway/device must enforce its own hard limits even if the website is compromised.

## 5. Simulation isolation
Simulation mode must have a hard boundary:
- `simulation=true` routes only to the simulator;
- no simulator API can reach physical command endpoints;
- simulation commands are clearly labeled;
- test data is tagged `SIMULATION`.

## 6. AI security
Treat telemetry, operator notes and imported files as untrusted input.

Rules:
- no AI-generated value can directly become a hardware command;
- no AI output can override deterministic safety rules;
- structured JSON output only;
- validate AI output with Zod;
- limit prompt/input size;
- redact secrets and credentials;
- do not send sensitive plant data to external AI providers without explicit authorization;
- store model/provider/version used for each AI result.

## 7. Data protection
Sensitive:
- user identity;
- audit history;
- plant/device identifiers;
- proprietary test data.

Controls:
- TLS;
- encrypted database at rest where available;
- least-privilege DB credentials;
- no secrets in Git;
- `.env` excluded from source control;
- backups;
- retention policy.

## 8. Audit logging
Log:
- login/logout;
- test creation;
- test start/stop;
- configuration changes;
- hardware commands;
- safety blocks;
- result finalization;
- report generation;
- admin actions.

Never allow normal users to edit audit records.

## 9. Web security
- CSRF protection where needed;
- rate limiting;
- secure headers;
- input validation;
- SQL injection protection through Prisma;
- XSS-safe rendering;
- file upload type/size validation;
- signed report URLs if external storage is used.

## 10. Safety disclaimer
The application is a monitoring/control interface for a prototype/hackathon system. It must not represent simulated or software-generated results as accredited certification. The supplied deck explicitly says actual IEC compliance certification requires specialized accredited high-energy laboratories.
