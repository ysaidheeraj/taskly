# Taskly

A comprehensive task management app.

## Prerequisites

Make sure you have the following installed:

- Python
- pip (Python package installer)

## Setup Server

### 1. Clone the Repository

```bash
git clone [https://github.com/ysaidheeraj/taskly.git]
cd taskly/server
```

### 2. Create a Virtual Environment

```bash
# On Windows
python -m venv venv

# On macOS and Linux
python3 -m venv venv
 ```

### 3. Activate the Virtual Environment
```bash
# On Windows
venv\Scripts\activate

# On macOS and Linux
source venv/bin/activate
```

### 4. Install Dependencies
```bash
# Install requirements file
pip install -r requirements.txt
```

### 5. Run migrations
```bash
# Make migrations
python manage.py makemigrations

# Run migrations
python manage.py migrate
```

### 6. Run the Django Server
```bash
python manage.py runserver
```
## Setup Client

Install node js (I have used v20.9.0)

### 1. Go to client from the parent directory directory
```bash
cd client
```

### 2. Install the packages
```bash
npm install
```
### 3. Run the client build
```bash
npm run dev
```
## Note: Modify proxy in package.json to point to your server during development
