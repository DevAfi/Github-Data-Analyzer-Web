from dataclasses import dataclass
from datetime import datetime
from typing import List, Dict, Optional

@dataclass
class RepoOverview:
    name: str
    full_name: str
    description: str
    stars: int
    forks: int
    created_at: datetime
    updated_at: datetime
    language: str
    open_issues: int
    watchers: int
    size: int  # in KB
    license_name: str
    topics: List[str]

@dataclass
class Contributor:
    login: str
    contributions: int
    percentage: float

@dataclass
class CommitStats:
    total_commits: int
    commits_per_day: float
    most_active_day: str
    most_active_hour: float

@dataclass
class HealthScore:
    activity_score: float # 0-100
    contributor_score: float # 0-100
    documentation_score: float # 0-100
    overall_score: float # 0-100
    rating: str