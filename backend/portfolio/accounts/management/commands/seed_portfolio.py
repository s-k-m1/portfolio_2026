"""Seed the database with the portfolio's real content."""
import os

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.conf import settings

from portfolio.accounts.models import Profile
from portfolio.projects.models import Project
from portfolio.services.models import Service
from portfolio.experience.models import Experience
from portfolio.education.models import Education
from portfolio.contact.models import ContactMessage
from portfolio.certifications.models import Certification
from portfolio.skills.models import Skill
from portfolio.blog.models import BlogPost, BlogTag, BlogPostTag
from portfolio.content.models import ContentBlock

PROJECTS = [
    {
        "title": "Restaurant Management System",
        "category": "Full Stack",
        "desc": "A comprehensive solution for order tracking, inventory management, and live sales metrics analytics.",
        "tech": "React | Django | PostgreSQL | JWT",
        "image": "",
        "image_url": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop",
        "github": "https://github.com/s-k-m1",
        "demo": "",
    },
    {
        "title": "School Management System",
        "category": "Full Stack",
        "desc": "Enterprise educational dashboard handling academic tracking, student databases, ledger billing, and grading pipelines.",
        "tech": "React | Django Rest Framework | PostgreSQL | Tailwind",
        "image": "",
        "image_url": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1000&auto=format&fit=crop",
        "github": "https://github.com/s-k-m1",
        "demo": "",
    },
    {
        "title": "SKM Tech Corporate Portfolio",
        "category": "Frontend",
        "desc": "High-performance agency branding site featuring fluid glassmorphism UI layouts and modern dashboard structures.",
        "tech": "React | Tailwind CSS | Vite | Lucide Icons",
        "image": "",
        "image_url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
        "github": "https://github.com/s-k-m1",
        "demo": "https://github.com/s-k-m1",
    },
    {
        "title": "Advanced Library Management Engine",
        "category": "Backend",
        "desc": "Automated indexing ledger tracking book inventory states, rental durations, overdue alerts, and dynamic query handling.",
        "tech": "Python | Django Models | MySQL | Cron Jobs",
        "image": "",
        "image_url": "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000&auto=format&fit=crop",
        "github": "https://github.com/s-k-m1",
        "demo": "",
    },
    {
        "title": "Enterprise Employee Management Hub",
        "category": "Backend",
        "desc": "Workforce data matrix handling payroll calculation scales, attendance tracking, and corporate hierarchy.",
        "tech": "Python | Django | PostgreSQL | ORM Queries",
        "image": "",
        "image_url": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop",
        "github": "https://github.com/s-k-m1",
        "demo": "",
    },
    {
        "title": "Centralized Secure Auth Provider",
        "category": "Security",
        "desc": "Robust authentication server handling multi-tenant RBAC, sliding JWT token expiration, and session blocklists.",
        "tech": "Python | Django | JWT Rotation | Redis",
        "image": "",
        "image_url": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
        "github": "https://github.com/s-k-m1",
        "demo": "",
    },
    {
        "title": "Bank Demat Automator",
        "category": "Backend",
        "desc": "Scripting and structural logic processing automated verification logs for Centralized KYC (CKYC) pipelines.",
        "tech": "Python | Django | PostgreSQL",
        "image": "",
        "image_url": "https://images.unsplash.com/photo-1550565118-3d143c61582b?q=80&w=1000&auto=format&fit=crop",
        "github": "https://github.com/s-k-m1",
        "demo": "",
    },
]

SKILLS = [
    # Frontend
    {"name": "React.js (SPA / Hooks)", "category": "Frontend", "percentage": 80},
    {"name": "JavaScript (ES6+) & JSON", "category": "Frontend", "percentage": 76},
    {"name": "Tailwind CSS & HTML5", "category": "Frontend", "percentage": 82},
    {"name": "Next.js (App Router)", "category": "Frontend", "percentage": 74},
    # Backend
    {"name": "Python & Django Framework", "category": "Backend", "percentage": 78},
    {"name": "Django REST Framework (DRF)", "category": "Backend", "percentage": 76},
    {"name": "PostgreSQL / SQL / ORM", "category": "Backend", "percentage": 74},
    # Tools
    {"name": "Postman API Testing", "category": "Tools", "percentage": 72},
    {"name": "Git & GitHub", "category": "Tools", "percentage": 88},
    {"name": "Jira Agile Management", "category": "Tools", "percentage": 65},
    {"name": "Docker & Deployment", "category": "Tools", "percentage": 62},
]

SERVICES = [
    {
        "title": "Full-Stack Web Development",
        "category": "Development",
        "description": "Engineering scalable web applications from scratch using clean HTML, CSS, and modern JavaScript architectures with Django backends.",
    },
    {
        "title": "React.js Client Applications",
        "category": "Development",
        "description": "Designing dynamic, interactive user interfaces with React.js, implementing smooth transitions and responsive states.",
    },
    {
        "title": "Django & Python Backends",
        "category": "Development",
        "description": "Building robust servers, business logic layers, and secure database interactions using Python and Django.",
    },
    {
        "title": "API Design & QA",
        "category": "Development",
        "description": "Developing robust RESTful API endpoints and running strict validation, debugging, and payload assertions.",
    },
    {
        "title": "Agile Management",
        "category": "Development",
        "description": "Organizing production steps, feature sprints, and operational dependencies inside Jira environments.",
    },
    {
        "title": "Version Control & CI/CD",
        "category": "Development",
        "description": "Maintaining codebase integrity, concurrent feature branches, and secure deployments via GitHub.",
    },
]

EDUCATION = [
    {
        "institution": "Pokhara University",
        "degree": "Bachelor of Science in Computer Science & Information Technology",
        "field": "Computer Science",
        "start_date": "2021-09-01",
        "end_date": None,
    }
]

EXPERIENCES = [
    {
        "title": "Full Stack Developer (Freelance)",
        "company": "SKM Tech",
        "location": "Kathmandu, Nepal",
        "start_date": "2022-06-01",
        "end_date": None,
        "is_current": True,
        "description": (
            "Building end-to-end web applications with Django REST Framework backends and "
            "React/Next.js frontends. Delivering APIs, dashboards, and secure authentication "
            "for client projects."
        ),
    },
    {
        "title": "Backend Developer Intern",
        "company": "Local Software House",
        "location": "Kathmandu, Nepal",
        "start_date": "2021-11-01",
        "end_date": "2022-05-30",
        "is_current": False,
        "description": (
            "Developed RESTful APIs and database schemas for internal tools. Wrote automated "
            "test suites and improved API response times through query optimization."
        ),
    },
]

CERTIFICATIONS = [
    {
        "title": "Django REST Framework Certified Developer",
        "issuer": "Programming Hero",
        "issue_date": "2023-08-15",
        "expiry_date": None,
    },
    {
        "title": "Full Stack Web Development",
        "issuer": "Meta (Coursera)",
        "issue_date": "2023-02-10",
        "expiry_date": None,
    },
    {
        "title": "PostgreSQL for Everybody",
        "issuer": "Coursera",
        "issue_date": "2022-11-01",
        "expiry_date": None,
    },
]

BLOG_TAGS = ["Django", "React", "PostgreSQL", "Best Practices"]

CONTENT_BLOCKS = {
    "site-description": (
        "Full Stack Developer portfolio of Saroj Kumar Mahato — building scalable "
        "web applications with React, Django, and PostgreSQL."
    ),
    "hero-cta-title": "Have a project in mind?",
    "hero-cta-subtitle": (
        "Lets build something great together — open to freelance projects and partnerships."
    ),
    "hero-cta-button": "Get in touch",
    "projects-intro": (
        "A selection of full-stack, backend, frontend, and security projects built "
        "with React, Django, and PostgreSQL."
    ),
    "services-intro": (
        "End-to-end development services — from architecture and APIs to polished "
        "interfaces and production delivery."
    ),
    "experience-intro": (
        "Professional experience, education, and certifications earned along the way."
    ),
    "contact-intro": (
        "Have a project in mind or need technical assistance? Let's build something "
        "great together."
    ),
    "blog-intro": (
        "Notes on Django, React, PostgreSQL, and the work I ship — with visuals "
        "straight from the backend."
    ),
    "footer-built-with": "Built with React, Next.js & Django",
    "footer-tagline": (
        "Building scalable web applications with React, Django, and PostgreSQL."
    ),
    "availability-badge": "Open for projects",
    "availability-note": (
        "Currently available for freelance work and full-time opportunities. "
        "I typically reply within 24 hours."
    ),
    "footer-cta-button": "Let's Talk",
    "contact-availability": "Open to freelance projects",
    "contact-channels": (
        "For the fastest response, email me directly or connect on GitHub. "
        "I typically reply within 24 hours."
    ),
}

BLOG_POSTS = [
    {
        "title": "How I Structure Django REST Framework Projects",
        "slug": "structuring-django-rest-framework-projects",
        "author": "Saroj Kumar Mahato",
        "category": "Tutorial",
        "tags": ["Django", "Best Practices"],
        "image_url": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1000&auto=format&fit=crop",
        "video_url": "",
        "content": (
            "A clean project structure saves weeks of debugging later. In this post I walk "
            "through the app-per-domain pattern I use for DRF backends.\n\n"
            "Start with separate apps for each business domain: projects, services, skills, blog. "
            "Each app owns its models, serializers, views, and URLs. Keep shared logic in a "
            "common module.\n\n"
            "Always define explicit serializers instead of dumping whole models. Expose only the "
            "fields the frontend needs and document every endpoint.\n\n"
            "Use viewsets for simple CRUD and function-based views for custom actions like "
            "contact forms or file uploads. Add throttling to public endpoints and return "
            "consistent error shapes.\n\n"
            "Finally, centralize environment configuration. Every secret should come from "
            "environment variables so local, staging, and production stay one command apart."
        ),
    },
    {
        "title": "Why PostgreSQL Should Be Your Default Database",
        "slug": "why-postgresql-should-be-your-default-database",
        "author": "Saroj Kumar Mahato",
        "category": "News",
        "tags": ["PostgreSQL"],
        "image_url": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop",
        "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "content": (
            "If you are starting a new project today, PostgreSQL receives my strong "
            "recommendation for most workloads.\n\n"
            "It handles JSON alongside relational data, so hybrid schemas avoid a second "
            "database. JSONB indexing, full-text search, and window functions cover advanced "
            "queries without external tools.\n\n"
            "Transactions stay solid with ACID guarantees, and the query planner explains every "
            "step. Monitoring slow queries and tuning indexes is straightforward.\n\n"
            "When your Django ORM is involved, migrations stay stable and the connection pool "
            "behaves predictably at scale."
        ),
    },
    {
        "title": "React Hooks Design Patterns I Use Every Day",
        "slug": "react-hooks-design-patterns",
        "author": "Saroj Kumar Mahato",
        "category": "Tutorial",
        "tags": ["React", "Best Practices"],
        "image_url": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
        "video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "content": (
            "Small hook patterns prevent larger refactors. Here are the three I apply in every "
            "React codebase.\n\n"
            "Custom hooks encapsulate data loading with loading and error states. Return a "
            "single state object so callers never peek at implementation details.\n\n"
            "Use memoization: useMemo for derived lists, useCallback for function props passed "
            "to memoized children.\n\n"
            "And split components: container components own state and side effects, while "
            "presentational components stay pure. Testing helps and the props help.\n\n"
            "These patterns keep the codebase approachable even when the app grows."
        ),
    },
    {
        "title": "Deploying Django + React Apps the Right Way",
        "slug": "deploying-django-react-apps-the-right-way",
        "author": "Saroj Kumar Mahato",
        "category": "Case Study",
        "tags": ["Django", "Best Practices"],
        "content": (
            "Deployment is where most side projects die, so here is the setup I trust for "
            "production Django + React stacks.\n\n"
            "Serve React statically behind the same origin and keep the Django API on its own "
            "domain or subpath. Use Gunicorn behind a reverse proxy, and PostgreSQL with "
            "environment-driven settings.\n\n"
            "Collect static once, migrate before you restart, and rotate logs. Set up an "
            "automated backup of the database — nightly at minimum.\n\n"
            "Finally, test the production build locally before you ever push. A notebook "
            "worksheet of the steps saves the painful first deploy."
        ),
    },
]


class Command(BaseCommand):
    help = "Seed the database with portfolio content."

    def handle(self, *args, **options):
        created = {
            "projects": 0,
            "services": 0,
            "education": 0,
            "profile": 0,
            "skills": 0,
            "experiences": 0,
            "certifications": 0,
            "blog_posts": 0,
            "content_blocks": 0,
        }

        projects = [Project(**p) for p in PROJECTS if not Project.objects.filter(title=p["title"]).exists()]
        Project.objects.bulk_create(projects)
        created["projects"] = len(projects)

        skills = [
            Skill(**{**s, "display_order": i})
            for i, s in enumerate(SKILLS)
            if not Skill.objects.filter(name=s["name"]).exists()
        ]
        Skill.objects.bulk_create(skills)
        created["skills"] = len(skills)

        services = [Service(**s) for s in SERVICES if not Service.objects.filter(title=s["title"]).exists()]
        Service.objects.bulk_create(services)
        created["services"] = len(services)

        education = [
            Education(**e)
            for e in EDUCATION
            if not Education.objects.filter(institution=e["institution"], degree=e["degree"]).exists()
        ]
        Education.objects.bulk_create(education)
        created["education"] = len(education)

        experiences = [
            Experience(**e)
            for e in EXPERIENCES
            if not Experience.objects.filter(company=e["company"], title=e["title"]).exists()
        ]
        Experience.objects.bulk_create(experiences)
        created["experiences"] = len(experiences)

        certifications = [
            Certification(**c)
            for c in CERTIFICATIONS
            if not Certification.objects.filter(title=c["title"]).exists()
        ]
        Certification.objects.bulk_create(certifications)
        created["certifications"] = len(certifications)

        tags = {name: BlogTag.objects.get_or_create(name=name)[0] for name in BLOG_TAGS}
        for post in BLOG_POSTS:
            if BlogPost.objects.filter(slug=post["slug"]).exists():
                continue
            post_tags = post.pop("tags")
            blog_post = BlogPost.objects.create(
                title=post["title"],
                slug=post["slug"],
                author=post["author"],
                category=post["category"],
                content=post["content"],
                image_url=post.get("image_url", ""),
                video_url=post.get("video_url", ""),
            )
            BlogPostTag.objects.bulk_create(
                [BlogPostTag(post=blog_post, tag=tags[t]) for t in post_tags]
            )
            created["blog_posts"] += 1

        content_created = 0
        for key, content in CONTENT_BLOCKS.items():
            _, created_block = ContentBlock.objects.get_or_create(
                key=key, defaults={"content": content}
            )
            if created_block:
                content_created += 1
        created["content_blocks"] = content_created

        user, _ = User.objects.get_or_create(username="saroj", defaults={"is_staff": True})
        profile, created_profile = Profile.objects.get_or_create(
            user=user,
            defaults={
                "phone": "+977-9807827561",
                "address": "Kathmandu, Nepal",
                "github": "https://github.com/s-k-m1",
                "linkedin": "https://www.linkedin.com/in/saroj-kumar-mahato",
                "portfolio_url": "https://saroj.com.np",
                "portfolio_description": (
                    "Full Stack Developer specializing in Django + React architecture. "
                    "Building scalable web applications with clean, production-ready design."
                ),
            },
        )
        if created_profile:
            created["profile"] = 1
        elif not profile.linkedin:
            profile.linkedin = "https://www.linkedin.com/in/saroj-kumar-mahato"
            profile.save()

        # Bootstrap a superuser from env (Render first deploy), then unset these vars
        admin_user = getattr(settings, "ADMIN_USERNAME", "") or os.environ.get("ADMIN_USERNAME", "")
        admin_pass = getattr(settings, "ADMIN_PASSWORD", "") or os.environ.get("ADMIN_PASSWORD", "")
        if admin_user and admin_pass:
            su, su_created = User.objects.get_or_create(
                username=admin_user, defaults={"is_staff": True, "is_superuser": True}
            )
            if not su.is_superuser:
                su.is_staff = True
                su.is_superuser = True
            su.set_password(admin_pass)
            su.save()

        self.stdout.write(
            self.style.SUCCESS(
                f"Seeded: {created['projects']} projects, {created['services']} services, "
                f"{created['education']} education, {created['experiences']} experiences, "
                f"{created['certifications']} certifications, {created['blog_posts']} blog posts, "
                f"{created['content_blocks']} content blocks, "
                f"{created['profile']} profile, {created['skills']} skills."
            )
        )