import type { Locale } from "@/lib/i18n/locales";
import type { StaticRouteKey } from "@/lib/i18n/routes";
import { applyPolishTypography } from "@/lib/typography";

export type AboutIconName =
  | "code"
  | "team"
  | "sparkle"
  | "bolt"
  | "list"
  | "pencil"
  | "target"
  | "chat"
  | "window"
  | "check-square"
  | "question"
  | "user"
  | "file"
  | "folder";

export type AboutCardContent = {
  icon: AboutIconName;
  title: string;
  description: string;
};

export type AboutProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type AboutCollaborationItem = {
  title: string;
  description: string;
};

export type AboutPrincipleItem = {
  title: string;
  description: string;
};

export type AboutFocusItem = {
  title: string;
  description: string;
};

export type AboutAvoidItem = {
  title: string;
  description: string;
};

export type AboutLinkTarget = StaticRouteKey | "github";

export type AboutLinkCard = {
  icon: AboutIconName;
  title: string;
  description: string;
  target: AboutLinkTarget;
};

export type AboutPageContent = {
  hero: {
    breadcrumb: string;
    headingPrefix: string;
    headingHighlight: string;
    lead: string;
    description: string;
    codeLines: readonly { indent: number; content: string }[];
    signature: string;
  };
  summary: {
    label: string;
    items: readonly AboutCardContent[];
  };
  process: {
    label: string;
    steps: readonly AboutProcessStep[];
  };
  principles: {
    label: string;
    items: readonly AboutPrincipleItem[];
  };
  collaboration: {
    label: string;
    note: string;
    badge: string;
    items: readonly AboutCollaborationItem[];
  };
  workBest: {
    label: string;
    statement: string;
    context: string;
    highlight: string;
    bullets: readonly string[];
  };
  focus: {
    label: string;
    description: string;
    items: readonly AboutFocusItem[];
  };
  avoid: {
    label: string;
    items: readonly AboutAvoidItem[];
  };
  links: readonly AboutLinkCard[];
};

const aboutContentByLocale = {
  pl: {
    hero: {
      breadcrumb: "Start / O mnie",
      headingPrefix: "O",
      headingHighlight: "Patryku",
      lead: "Frontend developer skupiony na dopracowanych, utrzymywalnych interfejsach dla zespołów produktowych.",
      description:
        "Najlepiej pracuję wtedy, gdy mogę zrozumieć kontekst, zaplanować implementację, dopasować się do istniejącej architektury i dowieźć rozwiązanie z dbałością o UX, wydajność oraz utrzymywalność.",
      codeLines: [
        { indent: 0, content: "const developer = {" },
        { indent: 1, content: "name: 'Patryk'," },
        { indent: 1, content: "role: 'Frontend'," },
        {
          indent: 1,
          content:
            "focus: ['Product', 'Implementation', 'Quality', 'Teamwork'],",
        },
        { indent: 1, content: "mindset: 'Ship with care'" },
        { indent: 0, content: "};" },
      ],
      signature: "Patryk",
    },
    summary: {
      label: "W skrócie",
      items: [
        {
          icon: "code",
          title: "Implementacja frontendowa",
          description:
            "Zamieniam projekty, cele produktowe i wymagania w dopracowany, utrzymywalny interfejs.",
        },
        {
          icon: "team",
          title: "Myślenie zespołem produktowym",
          description:
            "Dobry frontend zależy od ownershipu, wspólnego kontekstu i klarownej komunikacji.",
        },
        {
          icon: "sparkle",
          title: "Jakość dowożenia",
          description:
            "Flow, precyzja wizualna, wydajność, dostępność i edge case-y są częścią pracy.",
        },
        {
          icon: "bolt",
          title: "AI-assisted workflow",
          description:
            "Testuję agentów i workflowy, które pomagają szybciej planować, sprawdzać założenia i dowozić kod. AI traktuję jak narzędzie pracy, nie autora decyzji.",
        },
      ],
    },
    process: {
      label: "Jak pracuję",
      steps: [
        {
          number: "01",
          title: "Rozumiem system przed zmianą",
          description:
            "Zanim zacznę kodować, sprawdzam istniejącą architekturę, zależności i kontekst produktu. Dzięki temu zmiana pasuje do systemu, zamiast dokładać przypadkową warstwę kodu.",
        },
        {
          number: "02",
          title: "Planuję implementację",
          description:
            "Lubię najpierw rozbić problem na konkretne kroki: dane, stany, komponenty, edge case'y i ryzyka. To ogranicza chaos w trakcie pracy i ułatwia sensowną komunikację z zespołem.",
        },
        {
          number: "03",
          title: "Dowozę dopracowany frontend",
          description:
            "Nie kończę na tym, że działa u mnie. Zwracam uwagę na responsywność, dostępność, realne stany interfejsu, błędy, loadingi i utrzymywalność kodu.",
        },
      ],
    },
    principles: {
      label: "Na czym mi zależy",
      items: [
        {
          title: "Plan i zrozumienie przed kodowaniem",
          description:
            "Dobrze przygotowana implementacja rzadziej kończy się chaosem w połowie pracy.",
        },
        {
          title: "Komunikacja i wspólny język",
          description:
            "Wolę doprecyzować wcześniej niż dowiedzieć się za późno, że każdy rozumiał problem inaczej.",
        },
        {
          title: "Realne stany interfejsu",
          description:
            "Loadingi, błędy, puste stany i nietypowe dane to część jakości, nie dodatek na końcu.",
        },
        {
          title: "Prostsze rozwiązania zamiast sprytnych abstrakcji",
          description:
            "Utrzymywalny kod zwykle wygrywa z kodem, który wygląda imponująco tylko w dniu napisania.",
        },
      ],
    },
    collaboration: {
      label: "Współpracuję z",
      note:
        "Nie jestem UI designerem. Moja rola to implementacja, dopracowanie i techniczne dowiezienie interfejsu.",
      badge: "I implement, not design.",
      items: [
        {
          title: "Product",
          description:
            "Doprecyzowuję założenia i rozbijam pomysły na możliwe do wdrożenia elementy.",
        },
        {
          title: "Design",
          description:
            "Przekładam projekty na responsywne, dostępne i utrzymywalne interfejsy. Dbam o detale, które często wychodzą dopiero podczas implementacji.",
        },
        {
          title: "Backend",
          description:
            "Dbam o kontrakty, stany ładowania, błędy, edge case'y i kształt danych, bo frontend zależy od zachowania całego systemu.",
        },
        {
          title: "Content / CMS",
          description:
            "Buduję UI odporny na realną, zmienną treść, a nie tylko idealne placeholdery.",
        },
      ],
    },
    workBest: {
      label: "Gdzie pracuję najlepiej",
      statement:
        "Najlepiej pracuję w zespołach, które mają jasny kierunek, dobrą komunikację i realny ownership.",
      context:
        "Dobrze odnajduję się tam, gdzie frontend nie jest tylko przekładaniem designu na kod, ale częścią wspólnego dowożenia produktu.",
      highlight:
        "Autonomia jest cenna, ale nie wtedy, gdy staje się chaosem udającym wolność.",
      bullets: [
        "małe zespoły produktowe",
        "jasny kontekst i odpowiedzialność",
        "dobra komunikacja techniczna i nietechniczna",
        "współpraca z product, design, backend i content/CMS",
        "dzielenie się wiedzą i mentoring mniej doświadczonych osób",
        "wspólna odpowiedzialność za produkt",
      ],
    },
    focus: {
      label: "Obecny focus",
      description:
        "Poza komercyjnym frontend developmentem rozwijam rzeczy, które pomagają mi lepiej rozumieć cały proces delivery. Frontend pozostaje moim najmocniejszym obszarem komercyjnym, ale backend, infrastruktura i deployment pomagają mi budować lepsze rozwiązania produktowe.",
      items: [
        {
          title: "Micro-SaaS i małe produkty użytkowe",
          description:
            "Skupione narzędzia rozwiązujące jeden konkretny problem.",
        },
        {
          title: "egryzonie",
          description:
            "Użyteczna aplikacja pro publico bono z realnym zastosowaniem.",
        },
        {
          title: "AI-assisted development",
          description:
            "Agenci i workflowy do planowania, sprawdzania założeń i wsparcia implementacji. Decyzje techniczne zostają po mojej stronie.",
        },
        {
          title: "Backend i bazy danych",
          description:
            "API, bazy danych, Redis, BullMQ i narzędzia backendowe.",
        },
        {
          title: "Deployment",
          description:
            "VPS, Docker Context, Cloudflare Workers i Cloudflare Pages.",
        },
      ],
    },
    avoid: {
      label: "Czego unikam",
      items: [
        {
          title: "Zgadywanie zamiast doprecyzowania",
          description:
            "Niejasne oczekiwania spowalniają pracę. Wolę zadać pytania wcześniej.",
        },
        {
          title: "Przekombinowany kod",
          description:
            "Każdy projekt ma wystarczająco dużo ukrytych problemów bez dokładania niepotrzebnej sprytności.",
        },
        {
          title: "Pomieszanie ról",
          description:
            "Dbam o jakość designu, ale nie jestem UI designerem. Implementuję, dopracowuję i współpracuję.",
        },
        {
          title: "Chaos udający autonomię",
          description:
            "Cenię ownership, ale ownership potrzebuje kontekstu, komunikacji i wspólnej odpowiedzialności.",
        },
      ],
    },
    links: [
      {
        icon: "file",
        title: "Cyfrowe CV",
        description: "Doświadczenie, narzędzia, role i tło zawodowe.",
        target: "resume",
      },
      {
        icon: "folder",
        title: "GitHub",
        description: "Kod, eksperymenty i techniczne rzeczy rozwijane poza codzienną pracą.",
        target: "github",
      },
      {
        icon: "pencil",
        title: "Blog",
        description:
          "Kanał treści pod search visibility i długoterminowy ruch.",
        target: "blogIndex",
      },
    ],
  },
  en: {
    hero: {
      breadcrumb: "Index / About me",
      headingPrefix: "About",
      headingHighlight: "Patryk",
      lead: "Frontend developer focused on polished, maintainable interfaces for product teams.",
      description:
        "I work best when I can understand the context, plan the implementation, align with the existing architecture and deliver with care for UX, performance and maintainability.",
      codeLines: [
        { indent: 0, content: "const developer = {" },
        { indent: 1, content: "name: 'Patryk'," },
        { indent: 1, content: "role: 'Frontend'," },
        {
          indent: 1,
          content:
            "focus: ['Product', 'Implementation', 'Quality', 'Teamwork'],",
        },
        { indent: 1, content: "mindset: 'Ship with care'" },
        { indent: 0, content: "};" },
      ],
      signature: "Patryk",
    },
    summary: {
      label: "In short",
      items: [
        {
          icon: "code",
          title: "Frontend implementation",
          description:
            "Turning designs, product goals and requirements into shipped, maintainable UI.",
        },
        {
          icon: "team",
          title: "Product team mindset",
          description:
            "Good frontend depends on ownership, shared context and clear communication.",
        },
        {
          icon: "sparkle",
          title: "Quality delivery",
          description:
            "Flow, visual precision, performance, accessibility and edge cases are part of the job.",
        },
        {
          icon: "bolt",
          title: "AI-assisted workflow",
          description:
            "I test agents and workflows that help me plan faster, check assumptions, and ship code. I treat AI as a work tool, not the author of decisions.",
        },
      ],
    },
    process: {
      label: "How I work",
      steps: [
        {
          number: "01",
          title: "Understand the system before changing it",
          description:
            "Before I start coding, I check the existing architecture, dependencies and product context. That helps the change fit the system instead of adding a random layer of code.",
        },
        {
          number: "02",
          title: "Plan the implementation",
          description:
            "I like breaking the problem into concrete steps first: data, states, components, edge cases and risks. It reduces chaos during work and makes team communication clearer.",
        },
        {
          number: "03",
          title: "Deliver polished frontend",
          description:
            "I do not stop at it works on my machine. I pay attention to responsiveness, accessibility, real interface states, errors, loading states and maintainable code.",
        },
      ],
    },
    principles: {
      label: "What I care about",
      items: [
        {
          title: "Planning and understanding before coding",
          description:
            "A well-prepared implementation is less likely to turn into chaos halfway through.",
        },
        {
          title: "Communication and shared language",
          description:
            "I prefer clarifying early over learning too late that everyone understood the problem differently.",
        },
        {
          title: "Real interface states",
          description:
            "Loading, errors, empty states and unusual data are part of quality, not a final add-on.",
        },
        {
          title: "Simpler solutions over clever abstractions",
          description:
            "Maintainable code usually wins over code that only looks impressive on the day it was written.",
        },
      ],
    },
    collaboration: {
      label: "I collaborate with",
      note:
        "I am not a UI designer. My role is implementation, refinement and technical delivery of the interface.",
      badge: "I implement, not design.",
      items: [
        {
          title: "Product",
          description:
            "I clarify assumptions and break ideas into pieces that can be implemented.",
        },
        {
          title: "Design",
          description:
            "I translate designs into responsive, accessible and maintainable interfaces. I care about details that often appear only during implementation.",
        },
        {
          title: "Backend",
          description:
            "I care about contracts, loading states, errors, edge cases and data shape, because frontend depends on the behavior of the whole system.",
        },
        {
          title: "Content / CMS",
          description:
            "I build UI that can handle real, changing content, not only ideal placeholders.",
        },
      ],
    },
    workBest: {
      label: "Where I work best",
      statement:
        "I work best in teams with clear direction, good communication and real ownership.",
      context:
        "I fit well where frontend is not just translating design into code, but part of delivering the product together.",
      highlight:
        "Autonomy is valuable, but not when it becomes chaos disguised as freedom.",
      bullets: [
        "small product teams",
        "clear context and responsibility",
        "good technical and non-technical communication",
        "collaboration with product, design, backend and content/CMS",
        "knowledge sharing and mentoring less experienced people",
        "shared responsibility for the product",
      ],
    },
    focus: {
      label: "Current focus",
      description:
        "Beyond commercial frontend development, I develop things that help me understand the whole delivery process more deeply. Frontend remains my strongest commercial area, while backend, infrastructure and deployment help me build better product solutions.",
      items: [
        {
          title: "Micro-SaaS and small utility products",
          description: "Focused tools solving one specific problem.",
        },
        {
          title: "egryzonie",
          description:
            "A useful pro publico bono application with a real-world purpose.",
        },
        {
          title: "AI-assisted development",
          description:
            "Agents and workflows for planning, checking assumptions, and implementation support. Technical decisions stay with me.",
        },
        {
          title: "Backend and databases",
          description:
            "APIs, databases, Redis, BullMQ and backend tooling.",
        },
        {
          title: "Deployment",
          description:
            "VPS, Docker Context, Cloudflare Workers and Cloudflare Pages.",
        },
      ],
    },
    avoid: {
      label: "Things I avoid",
      items: [
        {
          title: "Guessing instead of clarifying",
          description:
            "Unclear expectations slow work down. I prefer asking questions early.",
        },
        {
          title: "Overcomplicated code",
          description:
            "Every project already has enough hidden problems without adding unnecessary cleverness.",
        },
        {
          title: "Mixing roles",
          description:
            "I care about design quality, but I am not a UI designer. I implement, refine and collaborate.",
        },
        {
          title: "Chaos disguised as autonomy",
          description:
            "I value ownership, but ownership needs context, communication and shared responsibility.",
        },
      ],
    },
    links: [
      {
        icon: "file",
        title: "Digital Resume",
        description: "Experience, tools, roles and professional background.",
        target: "resume",
      },
      {
        icon: "folder",
        title: "GitHub",
        description: "Code, experiments, and technical work developed outside day-to-day projects.",
        target: "github",
      },
      {
        icon: "pencil",
        title: "Blog",
        description:
          "Content channel for search visibility and long-term traffic.",
        target: "blogIndex",
      },
    ],
  },
} as const satisfies Record<Locale, AboutPageContent>;

const localizedAboutContent = {
  pl: applyPolishTypography(aboutContentByLocale.pl),
  en: aboutContentByLocale.en,
} as const satisfies Record<Locale, AboutPageContent>;

export function getAboutPageContent(locale: Locale): AboutPageContent {
  return localizedAboutContent[locale];
}
