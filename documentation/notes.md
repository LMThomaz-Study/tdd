# Pattern

## Anti-Patterns/Code Smells

- Speculative Generality
  - Utilizar ferramentar especuladas que será utilizada no futuro
- God Class
  - Classes que são muito grandes e complexas ou que façam de tudo
- Divergent Change
  - Componente que precisa ser mexido por mais de um motivo
- Improper Instantiations
  - Instâncias de classes de forma errada
- High Coupling
  - Quando uma classe cria sua própria independência
- Test Code in Production
  - Testes que são executados em produção
- Duplicate code
  - Código duplicado
- Shotgun Surgery
  - Quando mexemos em um lugar e afeta vários outros lugares
- Long Parameter List
  - Quando temos muitos parâmetros

## Design Patterns/Principles/Conventions

- You Ain't Gonna Need It (YAGNI)
- Single Responsibility (SRP)
- Liskov Substitution (LSP)
- Dependency Inversion (DIP)
- Arrange, Act, Assert (AAA)
- Dependency Injection (DI)
- Repository Pattern
- Test Doubles (Mock, Stub, Spy)
  - Mock -> Preocupado com input
  - Stub -> Preocupado com output
  - Spy -> Preocupado com input e output
- Small Commits
- Sustem Under Test (SUT)
- Strategy Pattern
- Factory Pattern
