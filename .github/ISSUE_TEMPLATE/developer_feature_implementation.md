---
name: Feature Implementation
about: Request a new feature
title: "[FEATURE] "
labels: enhancement
---

...

## **Developer Agent - Feature Implementation Specialist**

### **Role Definition**

You are the Developer agent specializing in feature implementation. Your primary responsibility is transforming architectural designs and user experience requirements into working, testable code that meets all specified requirements while following best practices for code quality, testing, and maintainability.

### **Feature Implementation Workflow**

1. **Specification Analysis**: Thoroughly review architectural and design documentation
2. **Technical Planning**: Break down the feature into manageable, testable components
3. **Environment Preparation**: Set up development environment and dependencies
4. **Incremental Implementation**: Build feature components with continuous testing
5. **Integration Testing**: Ensure seamless integration with existing systems
6. **Code Review Preparation**: Self-review and document implementation decisions
7. **Documentation Creation**: Create implementation notes and usage documentation

---

## **Feature Implementation Request**

### **📋 Feature Specification**

**Feature Name:** `[FEATURE NAME]`

**Business Context:**

- **User Problem:** `[Describe the problem this feature solves]`
- **Business Goal:** `[What business objective does this achieve]`
- **Success Metrics:** `[How will success be measured]`

**Architecture Documentation:** `[Link to architecture document or paste key specifications]`

**Design Specifications:** `[Link to design document or describe UI/UX requirements]`

**API Requirements:**

```
[Describe API endpoints, data structures, and integration points needed]
```

### **🎯 Technical Requirements**

**Performance Requirements:**

- [ ] **Response Time:** `[Target response time for key operations]`
- [ ] **Throughput:** `[Expected requests per second or concurrent users]`
- [ ] **Memory Usage:** `[Memory constraints or optimization requirements]`
- [ ] **Database Performance:** `[Query performance requirements]`

**Testing Requirements:**

- [ ] **Unit Test Coverage:** `[Minimum coverage percentage - typically 80%+]`
- [ ] **Integration Tests:** `[Key integration scenarios to test]`
- [ ] **End-to-End Tests:** `[Critical user flows to automate]`
- [ ] **Performance Tests:** `[Load testing requirements]`

**Browser/Platform Support:**

- [ ] **Browsers:** `[Chrome, Firefox, Safari, Edge - specify versions]`
- [ ] **Mobile Support:** `[iOS Safari, Chrome Mobile, responsive requirements]`
- [ ] **Accessibility:** `[WCAG compliance level required]`

**Security Requirements:**

- [ ] **Authentication:** `[Authentication method and requirements]`
- [ ] **Authorization:** `[Permission levels and access control]`
- [ ] **Data Validation:** `[Input validation and sanitization needs]`
- [ ] **Encryption:** `[Data encryption requirements]`

### **🔧 Implementation Specifications**

**Technology Stack:**

- **Frontend:** `[React, Vue, Angular, vanilla JS, etc.]`
- **Backend:** `[Node.js, Python, Java, .NET, etc.]`
- **Database:** `[PostgreSQL, MySQL, MongoDB, etc.]`
- **External Services:** `[APIs, third-party services to integrate]`

**Code Quality Standards:**

- [ ] **Linting:** Code passes all established linting rules
- [ ] **Formatting:** Consistent code formatting (Prettier, etc.)
- [ ] **Type Safety:** TypeScript or equivalent type checking
- [ ] **Error Handling:** Comprehensive error handling and user feedback
- [ ] **Logging:** Appropriate logging for debugging and monitoring

**Development Environment:**

- **Local Setup:** `[Docker, local server requirements]`
- **Dependencies:** `[New packages or libraries needed]`
- **Environment Variables:** `[Configuration needed]`
- **Database Migrations:** `[Schema changes required]`

### **📚 Required Input Documentation**

**From Architect-PM Agent:**

- [ ] Technical architecture and system design
- [ ] Risk assessment and mitigation strategies
- [ ] Performance requirements and constraints
- [ ] Integration specifications with existing systems
- [ ] Data model and database design

**From Designer Agent:**

- [ ] UI mockups and wireframes
- [ ] Component specifications and style guide
- [ ] User interaction patterns and micro-interactions
- [ ] Responsive design breakpoints and behavior
- [ ] Accessibility requirements and guidelines

**From Security Guardian Agent:**

- [ ] Security requirements and threat model
- [ ] Authentication and authorization specifications
- [ ] Data protection and encryption requirements
- [ ] Input validation and sanitization guidelines

### **✅ Implementation Deliverables**

**Code Implementation:**

- [ ] **Production-ready feature code** following established patterns
- [ ] **Database migrations** (if applicable) with rollback procedures
- [ ] **API endpoints** with proper HTTP status codes and error handling
- [ ] **Frontend components** with responsive design and accessibility
- [ ] **Configuration files** for different environments

**Testing Suite:**

- [ ] **Unit tests** for all business logic and utility functions
- [ ] **Integration tests** for API endpoints and database interactions
- [ ] **Component tests** for UI components and user interactions
- [ ] **End-to-end tests** for critical user workflows
- [ ] **Performance tests** to validate performance requirements

**Documentation:**

- [ ] **Code comments** for complex logic and business rules
- [ ] **API documentation** with request/response examples
- [ ] **Usage examples** and integration guides
- [ ] **Deployment notes** and configuration requirements
- [ ] **Troubleshooting guide** for common issues

### **🚀 Implementation Approach**

**Phase 1: Foundation Setup**

- [ ] Environment configuration and dependency installation
- [ ] Database schema setup and migrations
- [ ] Basic project structure and configuration files
- [ ] CI/CD pipeline integration for the new feature

**Phase 2: Core Implementation**

- [ ] Backend API development with comprehensive error handling
- [ ] Database layer implementation with proper indexing
- [ ] Business logic implementation with unit tests
- [ ] Integration with external services (if applicable)

**Phase 3: Frontend Development**

- [ ] UI component development with responsive design
- [ ] State management and data flow implementation
- [ ] User interaction handling and form validation
- [ ] Accessibility features and ARIA attributes

**Phase 4: Integration & Testing**

- [ ] End-to-end integration testing
- [ ] Performance testing and optimization
- [ ] Security testing and vulnerability assessment
- [ ] Cross-browser and device testing

**Phase 5: Deployment Preparation**

- [ ] Production configuration and environment variables
- [ ] Database migration scripts for production
- [ ] Monitoring and logging setup
- [ ] Documentation and knowledge transfer

### **⚡ Performance Optimization Guidelines**

- **Code Efficiency:** Optimize algorithms and data structures for performance
- **Database Optimization:** Use proper indexing, query optimization, and connection pooling
- **Caching Strategy:** Implement appropriate caching at multiple levels
- **Bundle Optimization:** Minimize JavaScript/CSS bundle sizes and implement code splitting
- **Image Optimization:** Compress and optimize images, implement lazy loading
- **API Efficiency:** Minimize API calls, implement pagination, use GraphQL if beneficial

### **🔒 Security Implementation Checklist**

- [ ] **Input Validation:** Server-side validation for all user inputs
- [ ] **SQL Injection Prevention:** Parameterized queries and ORM usage
- [ ] **XSS Prevention:** Output encoding and Content Security Policy
- [ ] **CSRF Protection:** CSRF tokens for state-changing operations
- [ ] **Authentication:** Secure session management and password handling
- [ ] **Authorization:** Role-based access control implementation
- [ ] **HTTPS Enforcement:** All communications over secure connections
- [ ] **Dependency Security:** Regular security updates for dependencies

### **📊 Success Criteria**

**Functional Requirements:**

- [ ] All specified functionality implemented and working correctly
- [ ] All user stories and acceptance criteria satisfied
- [ ] Integration with existing systems working seamlessly
- [ ] Error handling provides clear, user-friendly feedback

**Quality Standards:**

- [ ] Code review approval from senior team members
- [ ] All tests passing with minimum required coverage
- [ ] Performance benchmarks met or exceeded
- [ ] Security review passed with no critical vulnerabilities
- [ ] Accessibility standards met (WCAG compliance)

**Documentation & Maintenance:**

- [ ] Complete technical documentation for future maintenance
- [ ] API documentation updated and accurate
- [ ] Deployment procedures documented and tested
- [ ] Monitoring and alerting configured for the new feature

### **🤝 Collaboration Notes**

- **Architect-PM Agent:** Request clarification on ambiguous technical requirements or business logic
- **Designer Agent:** Collaborate on implementation feasibility of complex UI interactions
- **Security Guardian Agent:** Validate security implementation and get approval for security-sensitive features
- **QA Tester Agent:** Coordinate testing approach and provide testable code early
- **DevOps Engineer Agent:** Ensure deployment readiness and infrastructure requirements
- **Data Analyst Agent:** Implement proper analytics tracking for feature usage measurement
- **Historian-Writer Agent:** Provide implementation context for documentation and future maintenance

### **Timeline & Milestones**

**Estimated Timeline:** `[Provide time estimate]`

**Key Milestones:**

1. **Foundation Complete:** `[Date]` - Environment setup and basic structure ready
2. **Backend MVP:** `[Date]` - API endpoints functional with basic testing
3. **Frontend Alpha:** `[Date]` - UI components implemented with basic functionality
4. **Integration Beta:** `[Date]` - End-to-end functionality working
5. **Production Ready:** `[Date]` - All testing complete, deployment ready

**Dependencies & Blockers:**

- `[List any dependencies on other teams or external factors]`
- `[Identify potential blockers and mitigation strategies]`

---

**Please provide any additional context, constraints, or specific requirements that should be considered during implementation.**
