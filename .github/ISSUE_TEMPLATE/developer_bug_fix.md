---
name: Bug Fix
about: Report a bug to be fixed
title: "[BUG] "
labels: bug
---

...

## **Developer Agent - Bug Resolution Specialist**

### **Role Definition**
You are the Developer agent specializing in bug investigation and resolution. Your primary responsibility is systematically identifying root causes of software defects, implementing robust fixes, and ensuring comprehensive testing to prevent regression while maintaining code quality and system stability.

### **Bug Resolution Workflow**
1. **Bug Reproduction**: Systematically reproduce the issue in controlled environment
2. **Root Cause Analysis**: Debug and trace the issue to its source
3. **Impact Assessment**: Evaluate the scope and severity of the bug
4. **Solution Design**: Plan the fix approach with minimal risk
5. **Fix Implementation**: Code the solution with comprehensive testing
6. **Regression Testing**: Ensure the fix doesn't break existing functionality
7. **Documentation**: Record the fix and prevention strategies

---

## **Bug Fix Request**

### **🐛 Bug Description**

**Bug Title:** `[Clear, descriptive bug title]`

**Bug Summary:**
```
[Provide a clear, concise description of the bug and its impact]
```

**Severity Level:**
- [ ] **Critical** - System crash, data loss, security vulnerability, complete feature failure
- [ ] **High** - Major functionality broken, significant performance degradation
- [ ] **Medium** - Minor functionality issues, usability problems, edge case failures
- [ ] **Low** - Cosmetic issues, minor inconveniences, documentation errors

**Priority Level:**
- [ ] **P1** - Fix immediately (blocks release, affects all users)
- [ ] **P2** - Fix before next release (affects many users)
- [ ] **P3** - Fix in next planned release (affects some users)
- [ ] **P4** - Fix when time permits (affects few users)

### **📋 Reproduction Information**

**Steps to Reproduce:**
1. `[Step 1 - be specific about actions, inputs, and conditions]`
2. `[Step 2 - include any data setup or prerequisites]`
3. `[Step 3 - describe the exact sequence of events]`
4. `[Continue with additional steps as needed]`

**Expected Behavior:**
```
[Describe what should happen when the steps are followed correctly]
```

**Actual Behavior:**
```
[Describe what actually happens, including any error messages]
```

**Reproduction Rate:**
- [ ] **Always** (100% - occurs every time)
- [ ] **Frequently** (75-99% - occurs most of the time)
- [ ] **Sometimes** (25-74% - occurs intermittently)
- [ ] **Rarely** (<25% - difficult to reproduce)

### **🔧 Environment Information**

**Affected Environments:**
- [ ] **Production** `[Version/Build number]`
- [ ] **Staging** `[Version/Build number]`
- [ ] **Development** `[Version/Build number]`
- [ ] **Local Development** `[Version/Build number]`

**Browser/Client Information:**
- **Browser:** `[Chrome 120.0, Firefox 121.0, Safari 17.2, etc.]`
- **Operating System:** `[Windows 11, macOS Sonoma, Ubuntu 22.04, iOS 17, etc.]`
- **Device Type:** `[Desktop, Mobile, Tablet - include model if relevant]`
- **Screen Resolution:** `[If UI-related - 1920x1080, mobile viewport, etc.]`

**Backend Environment:**
- **Server OS:** `[Linux distribution, Windows Server, etc.]`
- **Runtime Version:** `[Node.js 18.x, Python 3.11, Java 17, etc.]`
- **Database:** `[PostgreSQL 15.x, MySQL 8.0, MongoDB 6.0, etc.]`
- **Dependencies:** `[Relevant package versions if known]`

### **📊 Impact Assessment**

**User Impact:**
- **Affected Users:** `[All users, specific user types, percentage estimate]`
- **Business Impact:** `[Revenue loss, user experience degradation, compliance issues]`
- **Workflow Disruption:** `[Which user workflows are affected]`
- **Data Impact:** `[Any data corruption, loss, or integrity issues]`

**System Impact:**
- **Performance Impact:** `[CPU, memory, network, database performance effects]`
- **System Stability:** `[Crashes, hanging processes, resource leaks]`
- **Integration Impact:** `[Effects on other systems or services]`
- **Security Implications:** `[Any security vulnerabilities exposed]`

### **🔍 Investigation Information**

**Error Messages/Logs:**
```
[Paste relevant error messages, stack traces, or log entries]
```

**Additional Context:**
- **Recent Changes:** `[Recent deployments, configuration changes, or updates]`
- **Related Issues:** `[Links to related bugs or feature requests]`
- **Workarounds:** `[Any temporary fixes or user workarounds available]`
- **First Occurrence:** `[When was this bug first reported or noticed]`

**Debugging Information Available:**
- [ ] **Error Logs** `[Location and timeframe of relevant logs]`
- [ ] **Database State** `[Relevant data that demonstrates the issue]`
- [ ] **Network Traces** `[If network-related issue]`
- [ ] **Performance Metrics** `[CPU, memory usage during bug occurrence]`
- [ ] **User Session Data** `[Anonymized user interaction data]`

### **🛠️ Debug Investigation Plan**

**Phase 1: Environment Setup & Reproduction**
- [ ] Set up clean reproduction environment
- [ ] Gather all necessary test data and conditions
- [ ] Document exact reproduction steps with screenshots/videos
- [ ] Verify reproduction across different environments
- [ ] Isolate variables that affect reproduction rate

**Phase 2: Root Cause Analysis**
- [ ] Enable detailed logging and debugging tools
- [ ] Trace execution flow through the affected code paths
- [ ] Analyze database queries and data state during failure
- [ ] Review recent code changes in related areas
- [ ] Identify the exact point of failure in the system

**Phase 3: Impact and Risk Assessment**
- [ ] Map all code paths that could be affected by the bug
- [ ] Identify potential data integrity issues
- [ ] Assess security implications of the bug
- [ ] Evaluate performance impact across the system
- [ ] Document all affected functionality and dependencies

### **⚡ Fix Implementation Strategy**

**Solution Approach:**
- [ ] **Minimal Risk Fix** - Smallest possible change to resolve the issue
- [ ] **Comprehensive Fix** - Address root cause and related potential issues
- [ ] **Temporary Workaround** - Quick mitigation while planning permanent fix
- [ ] **Architectural Change** - Fix requires design or architecture modifications

**Implementation Plan:**
1. **Code Changes:**
   ```
   [Describe the planned code modifications at a high level]
   ```

2. **Database Changes:**
   ```
   [Any schema changes, data migrations, or index additions needed]
   ```

3. **Configuration Changes:**
   ```
   [Environment variables, feature flags, or settings modifications]
   ```

4. **Dependencies:**
   ```
   [Package updates, new dependencies, or version changes required]
   ```

### **🧪 Testing Strategy**

**Unit Testing:**
- [ ] **New Tests:** Write tests that specifically validate the bug fix
- [ ] **Edge Cases:** Test boundary conditions and error scenarios
- [ ] **Mock External Dependencies:** Isolate the fix from external system changes
- [ ] **Performance Tests:** Ensure fix doesn't introduce performance regression

**Integration Testing:**
- [ ] **API Testing:** Validate all affected endpoints and data flows
- [ ] **Database Testing:** Test data consistency and transaction integrity
- [ ] **Service Integration:** Test interactions with external services
- [ ] **End-to-End Workflows:** Test complete user workflows that were affected

**Regression Testing:**
- [ ] **Automated Test Suite:** Run full automated test suite
- [ ] **Related Features:** Manually test features that share code paths
- [ ] **Performance Benchmarks:** Compare before/after performance metrics
- [ ] **Browser/Device Testing:** Test across all supported platforms

**User Acceptance Testing:**
- [ ] **Original Bug Scenario:** Verify the exact reported scenario is fixed
- [ ] **Related Use Cases:** Test similar user workflows
- [ ] **Error Handling:** Verify improved error messages and user feedback
- [ ] **Accessibility:** Ensure fix doesn't break accessibility features

### **📚 Documentation Requirements**

**Technical Documentation:**
- [ ] **Root Cause Analysis:** Document what caused the bug and why
- [ ] **Fix Description:** Explain the solution and why this approach was chosen
- [ ] **Code Comments:** Add comments explaining complex fix logic
- [ ] **API Changes:** Update API documentation if interfaces changed

**Knowledge Sharing:**
- [ ] **Lessons Learned:** Document insights for preventing similar bugs
- [ ] **Testing Improvements:** Recommend additional tests or monitoring
- [ ] **Process Improvements:** Suggest development process improvements
- [ ] **Team Communication:** Share findings with relevant team members

### **🚀 Deployment Strategy**

**Deployment Plan:**
- [ ] **Staging Validation:** Deploy and test thoroughly in staging environment
- [ ] **Feature Flags:** Use feature flags for gradual rollout if applicable
- [ ] **Monitoring:** Set up additional monitoring for the fixed functionality
- [ ] **Rollback Plan:** Prepare rollback procedure if issues arise

**Post-Deployment Validation:**
- [ ] **Smoke Testing:** Verify basic functionality immediately after deployment
- [ ] **Monitoring Alerts:** Watch for related errors or performance issues
- [ ] **User Feedback:** Monitor support channels for related user reports
- [ ] **Metrics Analysis:** Compare pre/post fix metrics for improvement validation

### **✅ Success Criteria**

**Bug Resolution:**
- [ ] Original reported bug can no longer be reproduced
- [ ] All identified edge cases and variations are fixed
- [ ] No new bugs introduced by the fix (regression testing passed)
- [ ] Performance impact is neutral or positive
- [ ] Code review approval from senior team member

**Quality Assurance:**
- [ ] All new and updated tests pass consistently
- [ ] Code coverage maintained or improved
- [ ] Security review passed (if applicable)
- [ ] Accessibility compliance maintained
- [ ] Cross-platform compatibility verified

**Documentation & Communication:**
- [ ] Fix is properly documented for future reference
- [ ] Related teams notified of changes if applicable
- [ ] User-facing changes communicated appropriately
- [ ] Monitoring and alerting updated if needed

### **🤝 Collaboration Requirements**

**QA Tester Agent:** Coordinate comprehensive testing strategy and validation
**Security Guardian Agent:** Review security implications and validate security fixes
**DevOps Engineer Agent:** Plan deployment strategy and monitoring setup
**Architect-PM Agent:** Consult on fixes that might require architectural changes
**Historian-Writer Agent:** Document the fix and update relevant documentation
**Data Analyst Agent:** Analyze impact metrics and validate fix effectiveness

### **📅 Timeline & Communication**

**Estimated Timeline:**
- **Investigation:** `[Time estimate for debugging and root cause analysis]`
- **Implementation:** `[Time estimate for coding the fix]`
- **Testing:** `[Time estimate for comprehensive testing]`
- **Deployment:** `[Time estimate for deployment and validation]`

**Communication Plan:**
- **Status Updates:** `[Frequency and method of progress updates]`
- **Stakeholder Notification:** `[Who needs to be informed of the fix]`
- **User Communication:** `[If users need to be notified of the resolution]`

---

**Additional Information:**
```
[Any additional context, constraints, or requirements for the bug fix]
```

**Attachments:**
- [ ] Screenshots or videos demonstrating the bug
- [ ] Log files or error traces
- [ ] Database dumps or relevant data samples
- [ ] Performance profiles or monitoring data