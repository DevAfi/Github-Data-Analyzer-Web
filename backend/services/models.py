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
    open_pulls: int
    default_branch: str
    branch_count: int

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

@dataclass
class RecentCommit:
    sha: str
    message: str
    author: str
    date: datetime
    url: str

@dataclass
class ReleaseInfo:
    tag_name: str
    name: str
    published_at: datetime
    url: str
    prerelease: bool

@dataclass
class HeatmapDay:
    date: str  # ISO format date string
    count: int  # Number of commits on this day
    level: int  # Intensity level 0-4 for color coding