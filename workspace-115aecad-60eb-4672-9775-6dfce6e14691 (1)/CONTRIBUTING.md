# 🤝 Contributing to RPP AI Pagurukiki

Terima kasih atas minat Anda untuk berkontribusi pada RPP AI Pagurukiki! Panduan ini akan membantu Anda memulai.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)

## 🌟 Code of Conduct

Harap baca [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) untuk memahami standar perilaku kami.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm atau yarn
- Git
- ZAI API key

### Fork dan Clone

1. **Fork repository**
   ```bash
   # Fork di GitHub, kemudian clone
   git clone https://github.com/your-username/rpp-ai-pagurukiki.git
   cd rpp-ai-pagurukiki
   ```

2. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/original-username/rpp-ai-pagurukiki.git
   ```

## 🛠 Development Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local dengan ZAI_API_KEY Anda
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Buka browser**
   ```
   http://localhost:3000
   ```

## 📝 How to Contribute

### Types of Contributions

1. **Bug Reports** - Laporkan bug yang Anda temukan
2. **Feature Requests** - Sarankan fitur baru
3. **Code Contributions** - Pull request untuk perbaikan
4. **Documentation** - Perbaiki dokumentasi
5. **Testing** - Tulis test cases

### Bug Reports

Gunakan template berikut untuk melaporkan bug:

```markdown
## Bug Description
Deskripsi singkat bug

## Steps to Reproduce
1. Langkah 1
2. Langkah 2
3. Langkah 3

## Expected Behavior
Apa yang seharusnya terjadi

## Actual Behavior
Apa yang terjadi

## Environment
- OS: [e.g. Windows 10, macOS 13.0]
- Browser: [e.g. Chrome 120, Firefox 121]
- Version: [e.g. v1.0.0]

## Screenshots
Tambahkan screenshot jika relevan
```

### Feature Requests

Gunakan template berikut untuk request fitur:

```markdown
## Feature Description
Deskripsi fitur yang diinginkan

## Problem Statement
Masalah yang ingin diselesaikan

## Proposed Solution
Solusi yang diusulkan

## Alternatives
Alternatif yang dipertimbangkan

## Additional Context
Konteks tambahan
```

## 🔄 Pull Request Process

### 1. Create Branch

```bash
# Buat branch baru dari main
git checkout main
git pull upstream main
git checkout -b feature/your-feature-name

# Atau untuk bug fix
git checkout -b fix/your-bug-fix
```

### 2. Make Changes

- Ikuti [coding standards](#coding-standards)
- Test perubahan Anda
- Update dokumentasi jika perlu

### 3. Commit Changes

Gunakan conventional commits:

```bash
# Feature
git commit -m "feat: add new RPP template for STEM"

# Bug fix
git commit -m "fix: resolve PDF generation issue"

# Documentation
git commit -m "docs: update installation guide"

# Style
git commit -m "style: fix linting issues"

# Refactor
git commit -m "refactor: improve API response handling"

# Test
git commit -m "test: add unit tests for RPP generation"
```

### 4. Push and Create PR

```bash
# Push ke fork Anda
git push origin feature/your-feature-name

# Buat Pull Request di GitHub
```

### 5. Pull Request Template

Gunakan template berikut:

```markdown
## Description
Deskripsi singkat perubahan

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Saya telah menguji perubahan ini
- [ ] Saya telah menambah test jika perlu
- [ ] Semua test pass

## Checklist
- [ ] Code mengikuti style guidelines
- [ ] Saya telah melakukan self-review
- [ ] Saya telah menambah dokumentasi jika perlu
- [ ] Saya telah mengupdate README jika perlu

## Screenshots
Tambahkan screenshot jika relevan

## Additional Notes
Catatan tambahan
```

## 📏 Coding Standards

### TypeScript

- Gunakan TypeScript strict mode
- Definisikan types untuk semua props
- Hindari `any` type

### React/Next.js

- Gunakan functional components dengan hooks
- Ikuti React best practices
- Gunakan `use client` untuk client-side code

### Styling

- Gunakan Tailwind CSS
- Ikuti shadcn/ui patterns
- Responsive design (mobile-first)

### File Structure

```
src/
├── app/
│   ├── api/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
├── lib/
└── types/
```

### Naming Conventions

- **Files**: kebab-case (`rpp-generator.tsx`)
- **Components**: PascalCase (`RPPGenerator`)
- **Functions**: camelCase (`generateRPP`)
- **Variables**: camelCase (`formData`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test
npm test -- --testNamePattern="RPP Generation"
```

### Writing Tests

- Test components dengan React Testing Library
- Test API endpoints
- Test utility functions
- Coverage minimum 80%

### Example Test

```typescript
// src/components/__tests__/RPPGenerator.test.tsx
import { render, screen } from '@testing-library/react'
import { RPPGenerator } from '../RPPGenerator'

describe('RPPGenerator', () => {
  it('renders form fields correctly', () => {
    render(<RPPGenerator />)
    
    expect(screen.getByLabelText('Nama Guru')).toBeInTheDocument()
    expect(screen.getByLabelText('Mata Pelajaran')).toBeInTheDocument()
  })
})
```

## 📖 Documentation

### Update Documentation

- README.md untuk informasi umum
- DEPLOYMENT.md untuk deployment guide
- API documentation untuk endpoints
- Component documentation dengan JSDoc

### Example Documentation

```typescript
/**
 * Generates RPP content using AI
 * @param data - RPP data including teacher info and subject details
 * @returns Generated RPP content
 * @throws Error when API call fails
 */
export async function generateRPP(data: RPPData): Promise<string> {
  // Implementation
}
```

## 🐛 Debugging

### Common Issues

1. **Build fails**
   - Check TypeScript errors
   - Verify imports
   - Check environment variables

2. **API errors**
   - Verify ZAI API key
   - Check network requests
   - Review API response format

3. **Styling issues**
   - Check Tailwind classes
   - Verify responsive design
   - Test on different browsers

### Debug Tools

- React DevTools
- Chrome DevTools
- TypeScript compiler
- ESLint

## 📞 Getting Help

1. **GitHub Issues** - Untuk bug reports dan feature requests
2. **Discussions** - Untuk pertanyaan dan diskusi
3. **Email** - Untuk pertanyaan privat

## 🎉 Recognition

Kontributor akan diakui di:
- README.md contributors section
- Release notes
- Special contributor badge

## 📜 License

Dengan berkontribusi, Anda setuju bahwa kontribusi Anda akan dilisensikan di bawah MIT License.

---

Terima kasih telah berkontribusi pada RPP AI Pagurukiki! 🎓✨