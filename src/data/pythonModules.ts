export interface GeneratedFile {
  id: string;
  path: string;
  content: string;
}

export const INITIAL_GENERATED_FILES: GeneratedFile[] = [
  {
    id: 'generate_portfolio',
    path: 'generate_portfolio.py',
    content: `"""Static portfolio validator and HTML generator for Bhoge Tejaswi."""

from __future__ import annotations

import html
import json
from pathlib import Path
from typing import Any

ROOT_DIR = Path(__file__).resolve().parent
DATA_FILE = ROOT_DIR / "portfolio_data.json"
INDEX_FILE = ROOT_DIR / "index.html"


def load_portfolio_data(path: Path = DATA_FILE) -> dict[str, Any]:
    """Load structured portfolio metadata from JSON."""
    if not path.exists():
        raise FileNotFoundError(f"Portfolio data file not found: {path}")
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def validate_certificates(certificates: list[dict[str, str]]) -> list[str]:
    """Verify every referenced certificate PDF exists in the repository root."""
    missing: list[str] = []
    for cert in certificates:
        pdf_name = cert.get("file", "")
        if pdf_name and not (ROOT_DIR / pdf_name).exists():
            missing.append(pdf_name)
    return missing


def render_skill_cards(skills: list[dict[str, Any]]) -> str:
    """Render HTML article blocks for each skill category."""
    blocks: list[str] = []
    for category in skills:
        tags = "".join(f"<span>{html.escape(item)}</span>" for item in category["items"])
        blocks.append(
            "<article>"
            f"<b>{html.escape(category['symbol'])}</b>"
            f"<h3>{html.escape(category['title'])}</h3>"
            f"<p>{html.escape(category['description'])}</p>"
            f'<div class="tags">{tags}</div>'
            "</article>"
        )
    return "".join(blocks)


def render_certificate_cards(certificates: list[dict[str, str]]) -> str:
    """Render Wolfram U and academic certificate blocks."""
    cards: list[str] = []
    for cert in certificates:
        cards.append(
            "<article>"
            '<div class="seal">W<span>U</span></div>'
            "<div>"
            f"<small>{html.escape(cert['issuer'])}</small>"
            f"<h3>{html.escape(cert['title'])}</h3>"
            f"<p>{html.escape(cert['details'])}</p>"
            f'<a href="{html.escape(cert["file"])}" target="_blank" rel="noopener">'
            "View certificate ↗</a>"
            "</div>"
            "</article>"
        )
    return "".join(cards)


def build_summary_report(data: dict[str, Any]) -> str:
    """Generate a terminal-friendly summary of the portfolio configuration."""
    missing = validate_certificates(data.get("certificates", []))
    lines = [
        f"Portfolio Owner : {data['owner']['name']}",
        f"Location        : {data['owner']['location']}",
        f"Contact Email   : {data['owner']['email']}",
        f"Skills Sections : {len(data.get('skills', []))}",
        f"Projects Listed : {len(data.get('projects', []))}",
        f"Certificates    : {len(data.get('certificates', []))}",
        f"Missing PDFs    : {', '.join(missing) if missing else 'None'}",
    ]
    return "\\n".join(lines)


if __name__ == "__main__":
    portfolio = load_portfolio_data()
    print(build_summary_report(portfolio))
    if INDEX_FILE.exists():
        print(f"Verified live GitHub Pages entry file: {INDEX_FILE.name} ({INDEX_FILE.stat().st_size} bytes)")
`,
  },
  {
    id: 'ai_study_buddy',
    path: 'projects/ai_study_buddy.py',
    content: `"""AI Study Buddy: Student productivity and study-session planner."""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import date, timedelta


@dataclass
class StudyTopic:
    """Represents a subject topic with difficulty and completion state."""

    subject: str
    title: str
    estimated_minutes: int
    priority: int = 2  # 1 = High, 2 = Medium, 3 = Low
    completed: bool = False


@dataclass
class StudyPlan:
    """Manages daily study sessions for Computer Science coursework."""

    student_name: str = "Bhoge Tejaswi"
    topics: list[StudyTopic] = field(default_factory=list)

    def add_topic(
        self,
        subject: str,
        title: str,
        estimated_minutes: int,
        priority: int = 2,
    ) -> None:
        self.topics.append(
            StudyTopic(
                subject=subject,
                title=title,
                estimated_minutes=estimated_minutes,
                priority=priority,
            )
        )

    def mark_completed(self, title: str) -> bool:
        for topic in self.topics:
            if topic.title.lower() == title.lower():
                topic.completed = True
                return True
        return False

    def completion_rate(self) -> float:
        if not self.topics:
            return 0.0
        done = sum(1 for topic in self.topics if topic.completed)
        return round((done / len(self.topics)) * 100, 1)

    def next_recommended_sessions(self, max_minutes: int = 90) -> list[StudyTopic]:
        """Select highest-priority pending topics that fit within available time."""
        pending = sorted(
            (topic for topic in self.topics if not topic.completed),
            key=lambda item: (item.priority, item.estimated_minutes),
        )
        chosen: list[StudyTopic] = []
        used = 0
        for topic in pending:
            if used + topic.estimated_minutes <= max_minutes:
                chosen.append(topic)
                used += topic.estimated_minutes
        return chosen

    def weekly_schedule(self, start_day: date | None = None) -> dict[str, list[str]]:
        """Distribute pending topics across upcoming days."""
        current_day = start_day or date.today()
        schedule: dict[str, list[str]] = {}
        pending = [t for t in self.topics if not t.completed]
        for index, topic in enumerate(pending):
            day_key = (current_day + timedelta(days=index)).isoformat()
            schedule.setdefault(day_key, []).append(
                f"[{topic.subject}] {topic.title} ({topic.estimated_minutes} min)"
            )
        return schedule


def create_default_plan() -> StudyPlan:
    plan = StudyPlan()
    plan.add_topic("Data Structures", "Linked Lists & Stacks", 45, priority=1)
    plan.add_topic("Discrete Mathematics", "Graph Theory Basics", 40, priority=1)
    plan.add_topic("Python", "File I/O and Dataclasses", 35, priority=2)
    plan.mark_completed("Linked Lists & Stacks")
    return plan


if __name__ == "__main__":
    my_plan = create_default_plan()
    print(f"Study Plan for {my_plan.student_name} — Progress: {my_plan.completion_rate()}%")
    for session in my_plan.next_recommended_sessions():
        print(f"  Next: {session.subject} -> {session.title} ({session.estimated_minutes}m)")
`,
  },
];

export function utf8ByteLength(text: string): number {
  return new TextEncoder().encode(text).length;
}
