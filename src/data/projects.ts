export interface Project {
  id: string;
  name: string;
  category: 'Full Stack' | 'Machine Learning' | 'Cloud & Security';
  subtitle: string;
  description: string;
  problemStatement: string;
  solutionOverview: string;
  technologies: string[];
  keyFeatures: string[];
  personalContribution: string;
  liveDemo?: string;
  githubUrl?: string;
  metrics?: string;
  disclaimer?: string;
  codeSnippetPreview?: {
    language: string;
    code: string;
  };
}

export const projectsData: Project[] = [
  {
    id: 'engenix-ecommerce',
    name: 'Engenix E-Commerce Website',
    category: 'Full Stack',
    subtitle: 'Responsive modern e-commerce platform with real-time cart & search',
    description:
      'A responsive e-commerce web application featuring real-time product search, dynamic filtering, shopping cart functionality, and user account management.',
    problemStatement:
      'Modern digital shoppers require seamless, instantaneous product exploration, responsive UI states across devices, and intuitive checkout experiences without latency or layout shifts.',
    solutionOverview:
      'Engineered an interactive single-page e-commerce interface using React.js with modular component architecture, state-driven cart persistence, interactive filter panels, and responsive design systems.',
    technologies: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Responsive Design'],
    keyFeatures: [
      'Instant keyword search and category/price filtering',
      'Interactive shopping cart with dynamic total recalculation',
      'User account management and order summary workflows',
      'Fully responsive UI optimized for mobile, tablet, and desktop',
      'Smooth client-side routing and animated micro-interactions',
    ],
    personalContribution:
      'Architected the React component hierarchy, built the global shopping cart state, implemented multi-parameter filter algorithms, and deployed to Netlify production.',
    liveDemo: 'https://engenix01.netlify.app/',
    codeSnippetPreview: {
      language: 'javascript',
      code: `// Cart reducer & state dispatcher
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'UPDATE_QTY':
      return { ...state, items: state.items.map(i => i.id === action.id ? {...i, qty: action.qty} : i) };
    default:
      return state;
  }
};`,
    },
  },
  {
    id: 'slaas-logging',
    name: 'Secure Logging as a Service (SLAAS)',
    category: 'Cloud & Security',
    subtitle: 'Cloud-based secure logging system designed for centralized log management and analysis',
    description:
      'A robust cloud-based secure logging architecture designed for enterprise log capture, encrypted audit preservation, and streamlined administrative querying.',
    problemStatement:
      'Distributed enterprise systems generate massive volumes of logs that are vulnerable to unauthorized tampering, data leakage, and disorganized indexing, making compliance and incident investigation difficult.',
    solutionOverview:
      'Implemented a secure logging pipeline using Java and relational MySQL databases. The service ingests application logs, ensures cryptographic integrity, partitions log indices, and supports structured analytical queries.',
    technologies: ['Java', 'MySQL', 'JDBC', 'OOP', 'Cryptography Basics', 'MVC Architecture'],
    keyFeatures: [
      'Centralized log ingestion with structured schema mapping',
      'Tamper-evident log storage and verification mechanism',
      'Role-based access control for administrative audit trails',
      'Optimized indexing for rapid temporal and severity-level queries',
      'Automated archiving policies to maintain storage efficiency',
    ],
    personalContribution:
      'Designed the relational MySQL schema for log indexing, implemented Java data access objects (DAO), and developed the verification logic for log integrity.',
    codeSnippetPreview: {
      language: 'java',
      code: `public class LogIngestionService {
    public boolean ingestLog(LogEntry entry) throws SQLException {
        String query = "INSERT INTO audit_logs (source_id, severity, payload, timestamp, checksum) VALUES (?, ?, ?, ?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(query)) {
            stmt.setString(1, entry.getSourceId());
            stmt.setString(2, entry.getSeverity());
            stmt.setString(3, entry.getPayload());
            stmt.setTimestamp(4, new Timestamp(System.currentTimeMillis()));
            stmt.setString(5, SecurityUtils.computeSHA256(entry.getPayload()));
            return stmt.executeUpdate() > 0;
        }
    }
}`,
    },
  },
  {
    id: 'cyber-breaches-detection',
    name: 'Cyber Hacking Breaches Prediction & Detection',
    category: 'Machine Learning',
    subtitle: 'Threat intelligence system utilizing historical attack telemetry to predict and identify breach patterns',
    description:
      'A machine-learning-based cyber threat detection system using historical attack data to support threat prediction, anomaly identification, and proactive security response.',
    problemStatement:
      'Modern security operations centers struggle with alert fatigue and retroactive breach discovery, requiring predictive intelligence to flag attack vectors before extensive compromise occurs.',
    solutionOverview:
      'Built a machine learning pipeline in Python that ingests historical breach patterns, normalizes network telemetry, trains predictive models, and presents findings through an interactive web dashboard.',
    technologies: ['Python', 'Scikit-Learn', 'Pandas', 'HTML', 'CSS', 'JavaScript'],
    keyFeatures: [
      'Data preprocessing pipeline for high-dimensional network attack datasets',
      'Feature correlation analysis to identify key breach indicators',
      'Trained classification models capable of distinguishing normal vs. anomalous behavior',
      'Interactive web dashboard displaying breach probability and threat metrics',
      'Detailed log visualization for incident response analysis',
    ],
    personalContribution:
      'Curated and cleaned attack telemetry datasets, implemented feature engineering in Python, evaluated model precision/recall curves, and constructed the frontend inspection interface.',
    codeSnippetPreview: {
      language: 'python',
      code: `# Cyber Breach Classification Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X_scaled, y_labels, test_size=0.2, random_state=42)
detector = RandomForestClassifier(n_estimators=100, max_depth=12, random_state=42)
detector.fit(X_train, y_train)

threat_probabilities = detector.predict_proba(X_test)[:, 1]`,
    },
  },
  {
    id: 'anemia-prediction',
    name: 'Anemia Prediction via Eye Conjunctival Image Analysis',
    category: 'Machine Learning',
    subtitle: 'Non-invasive anemia assessment combining conjunctival computer vision and patient lifestyle features',
    description:
      'A non-invasive anemia prediction research project combining conjunctival image feature extraction and patient lifestyle factors to estimate hemoglobin risk indicators.',
    problemStatement:
      'Traditional blood-draw invasive testing is often inaccessible or delayed in remote clinics. A rapid non-invasive screening technique could assist preliminary health awareness.',
    solutionOverview:
      'Formulated an automated classification workflow utilizing conjunctival region extraction combined with key patient lifestyle parameters, trained across multiple classical machine learning models.',
    technologies: ['Python', 'Decision Trees', 'SVM', 'Random Forest', 'Computer Vision Basics', 'Pandas'],
    keyFeatures: [
      'Conjunctival color and texture feature extraction pipeline',
      'Integration of demographic and lifestyle behavioral indicators',
      'Comparative benchmarking across Decision Tree, SVM, and Random Forest',
      'Reported 95.10% accuracy across evaluated academic test splits',
      'Modular prediction interface for experimental trial evaluation',
    ],
    personalContribution:
      'Performed image preprocessing, extracted RGB/HSV erythrocyte hue metrics, trained SVM and Random Forest classifiers, and documented empirical model evaluations.',
    metrics: '95.10% reported accuracy in academic dataset evaluation',
    disclaimer:
      'Important Notice: This project was developed solely as an academic and research engineering initiative. It is not clinically validated and is not intended to serve as a medical diagnostic tool or substitute for professional medical advice.',
    codeSnippetPreview: {
      language: 'python',
      code: `# Non-invasive Feature Assessment
models = {
    'DecisionTree': DecisionTreeClassifier(max_depth=6),
    'SVM': SVC(kernel='rbf', probability=True),
    'RandomForest': RandomForestClassifier(n_estimators=120)
}
# Reported test split accuracy reached 95.10%
# (Academic research baseline evaluation only)`,
    },
  },
];
