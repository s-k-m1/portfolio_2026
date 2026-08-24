"""Seed 5 public (approved) reviews for every project that has none yet."""
from django.core.management.base import BaseCommand

from portfolio.projects.models import Project, ProjectReview

NAMES = [
    "Aarav Sharma",
    "Sita Bhandari",
    "Anish Thapa",
    "R. Joshi",
    "H. Karki",
    "Dr. E. Rai",
    "Maya Rai",
    "N. Gupta",
    "B. Maharjan",
    "K. Shrestha",
    "R. K. Thapa",
    "S. Poudel",
    "L. Sherpa",
    "P. Acharya",
    "M. Shrestha",
]

COMMENTS = [
    "Working with Saroj on {title} was effortless. The {category} work was delivered on time and exceeded our expectations.",
    "The {title} project transformed how our team operates. Saroj's {category} expertise is clearly top-tier.",
    "We hired Saroj for {title} and the results speak for themselves — clean code, great communication, and real impact.",
    "From planning to launch, {title} was handled with total professionalism. The {category} solution is exactly what we needed.",
    "Saroj understood our requirements for {title} immediately and delivered a polished {category} product. Highly recommended.",
    "Our experience with {title} was fantastic. Reliable, skilled, and genuinely invested in the outcome.",
    "The quality of the {category} work on {title} was excellent. We'll definitely work with Saroj again.",
    "Saroj tackled the complex parts of {title} with ease. Communication was clear throughout the {category} engagement.",
    "{title} turned out better than we imagined. Saroj's attention to detail on the {category} side is unmatched.",
    "We couldn't be happier with {title}. Professional, fast, and the {category} delivery was flawless.",
]

RATINGS = [5, 5, 4, 5, 4]


class Command(BaseCommand):
    help = "Create 5 approved reviews for each project that has no reviews."

    def handle(self, *args, **options):
        created = 0
        projects = Project.objects.all()
        for idx, project in enumerate(projects):
            if project.reviews.exists():
                continue
            for j in range(5):
                name = NAMES[(idx * 5 + j) % len(NAMES)]
                comment = COMMENTS[(idx + j) % len(COMMENTS)].format(
                    title=project.title, category=project.category
                )
                ProjectReview.objects.create(
                    project=project,
                    name=name,
                    rating=RATINGS[j % len(RATINGS)],
                    comment=comment,
                    approved=True,
                )
                created += 1
        self.stdout.write(
            self.style.SUCCESS(f"Seeded {created} reviews across {projects.count()} projects.")
        )
