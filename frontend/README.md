# Speech-to-Text Frontend

A beautiful Svelte frontend for the Speech-to-Text application that allows users to upload audio files, get transcriptions, and generate summaries.

## Features

- Upload audio files for transcription
- Review and edit transcriptions
- Generate summaries from transcriptions
- Copy transcriptions and summaries to clipboard
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Python 3.12
- pip

### Backend Setup

1. Ensure Python 3.12 is installed:

   ```bash
   # Check Python version
   python3.12 --version

   # If not installed, install Python 3.12
   # On macOS with Homebrew:
   brew install python@3.12
   # On Ubuntu/Debian:
   sudo add-apt-repository ppa:deadsnakes/ppa
   sudo apt update
   sudo apt install python3.12
   ```

2. Create and activate a Python 3.12 virtual environment:

   ```bash
   # Create virtual environment with Python 3.12
   python3.12 -m venv venv

   # Activate virtual environment
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate

   # Verify Python version in venv
   python --version  # Should show Python 3.12.x
   ```

3. Install Python dependencies:
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

### Frontend Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```
   cd frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn
   ```

### Development

To run the development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

### Module Configuration

This project uses ES modules. Make sure your package.json includes:

```json
{
  "type": "module"
}
```

If you encounter module-related errors, you can either:

1. Add `"type": "module"` to package.json (recommended)
2. Rename configuration files to use the .mjs extension
3. Use the `--bundleConfigAsCjs` flag when running Rollup

The development server will start at `http://localhost:5000` by default.

### Connecting to GCP Instance

To connect to your GCP instance using RSA keys:

1. If you haven't already, add your public key to GCP:

   ```bash
   # In GCP Console: Compute Engine > Metadata > SSH Keys
   # Add your public key content there
   ```

2. Connect using SSH with your private key:

   ```bash
   ssh -i /path/to/your/private_key USERNAME@INSTANCE_IP
   ```

   Replace:

   - `/path/to/your/private_key` with the path to your RSA private key
   - `USERNAME` with your username on the instance
   - `INSTANCE_IP` with your GCP instance's external IP address

3. If you get permissions errors, ensure your key file has correct permissions:

   ```bash
   chmod 600 /path/to/your/private_key
   ```

4. To make connection easier, you can add this to your `~/.ssh/config`:
   ```
   Host gcp-instance
       HostName INSTANCE_IP
       User USERNAME
       IdentityFile /path/to/your/private_key
   ```
   Then connect simply with:
   ```bash
   ssh gcp-instance
   ```
