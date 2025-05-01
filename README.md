# Coretex

Coretex is a personal content management system — a "second brain" — where users can save and organize content from platforms like YouTube, Twitter, and Spotify, or simply take notes. It's designed to help users store valuable content in one place and revisit it easily through search, tags, and rich previews.

## What is Coretex?

Coretex lets users collect internet content they care about — whether it's a YouTube video they want to watch later, a tweet worth saving, a Spotify playlist, or personal notes and thoughts. All of this is displayed with modern, embedded previews so users can interact with their content in a visual and engaging way.

## Features

- **Content Saving**  
  Users can save different types of content: YouTube videos, tweets, Spotify playlists, or write their own notes. Each saved item includes a title, a link (if applicable), and optional tags.

- **Live Embed Previews**  
  As soon as a user pastes a link, Coretex generates a live embed preview — making the content easier to identify and interact with.

- **Rich Note Editor**  
  A fully-featured rich text editor is included for note-taking, allowing for headings, bold/italic text, lists, and more.

- **Tagging System**  
  Users can assign custom tags to any piece of content, making it easier to categorize and retrieve later.

- **Search and Filtering**  
  Content can be filtered by type (YouTube, Twitter, Spotify, or Notes) and searched by tags, helping users quickly find what they're looking for.

## How It Works

1. **Creating Content**  
   On the content creation page, users can add a title, paste a link (or write a note), and add tags. If a link is provided, a preview of the content is shown automatically.

2. **Viewing Content**  
   Saved content is displayed in a clean layout using embeds for supported platforms. This makes the interface feel more dynamic and useful.

3. **Organizing and Finding Content**  
   Users can search by tags or filter by content type to locate specific items from their collection.

## What's Next

- Chrome extension to save content directly from the browser
- Auto-tagging or summarization using AI
- Mobile-friendly UI and potential offline support
- Sharable links for content vaults so users can share specific collections with others

## Manual Installation

Follow these steps to set up Coretex manually on your local machine.

### Prerequisites

Before you start, make sure you have the following installed:

- **Node.js** (v16 or higher) — [Install Node.js](https://nodejs.org/en/download/)
- **PostgreSQL** — [Install PostgreSQL](https://www.postgresql.org/download/)
- **Bun** (for package management and running the app) — [Install Bun](https://bun.sh/)

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/prathamesh0222/coretex.git
   cd coretex
   bun install
   
