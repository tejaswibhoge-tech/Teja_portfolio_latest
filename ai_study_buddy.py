"""AI Study Buddy: Student productivity and study-session planner."""

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
