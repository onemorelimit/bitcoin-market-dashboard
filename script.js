/* ============================================================
   BITCOIN MARKET ANALYSIS DASHBOARD - JAVASCRIPT
   Interactive Chart Generation & Functionality
   ============================================================ */

/**
 * Initialize Mermaid Diagram Library
 * Used for rendering mindmap visualization
 */
mermaid.initialize({ startOnLoad: true, theme: 'dark' });
mermaid.contentLoaded();

/**
 * Chart Global Configuration
 * Sets default styling for all Chart.js charts
 */
Chart.defaults.color = '#b0b8d4';
Chart.defaults.borderColor = '#2a3a5a';
Chart.defaults.font.family = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

// Store chart instances for later access/updates
const charts = {};

/**
 * Generate Bitcoin Price Data
 * Simulates price movements from Jan 2025 to May 2026
 * Includes all major phases: Bull -> Euphoria -> Correction -> Recovery
 */
function generatePriceData() {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        'Jan', 'Feb', 'Mar', 'Apr', 'May'
    ];
    
    // Simulated price data showing market movement
    const prices = [
        42000,  // Jan 2025 - Start
        46000,  // Feb - Early bull
        52000,  // Mar - Bull momentum
        68000,  // Apr - Euphoria begins
        85000,  // May - ATH approach
        97000,  // Jun - ATH Peak
        94000,  // Jul - Early consolidation
        91000,  // Aug - Profit taking
        89000,  // Sep - Consolidation continues
        92000,  // Oct - Year-end rally begins
        95000,  // Nov - Strong momentum
        96500,  // Dec - Year-end strength
        97000,  // Jan 2026 - Institutional rally
        75000,  // Feb - Correction/Crash
        76500,  // Mar - Recovery begins
        77800,  // Apr - Recovery momentum
        78000   // May - Recovery stabilization
    ];

    return { months, prices };
}

/**
 * Generate ETF Flow Data
 * Represents capital inflows and outflows over time
 */
function generateETFData() {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        'Jan', 'Feb', 'Mar', 'Apr', 'May'
    ];
    
    // Simulated ETF flows in billions USD
    const inflows = [
        0.8, 1.2, 1.5, 2.1, 3.2, 5.2,
        1.8, 0.5, 0.3, 2.0, 3.5, 4.2,
        5.2, -3.1, 0.8, 1.5, 2.0
    ];

    return { months, inflows };
}

/**
 * Generate Sentiment Data
 * Fear & Greed Index from 0-100
 */
function generateSentimentData() {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        'Jan', 'Feb', 'Mar', 'Apr', 'May'
    ];
    
    // Sentiment index (0=fear, 100=greed)
    const sentiment = [
        65, 68, 70, 75, 82, 95,
        75, 58, 52, 70, 78, 80,
        85, 35, 48, 55, 60
    ];

    return { months, sentiment };
}

/**
 * Initialize Bitcoin Price Trend Chart
 * Shows price movement with color-coded phases
 */
function initializePriceChart() {
    const ctx = document.getElementById('priceChart');
    if (!ctx) return;

    const { months, prices } = generatePriceData();
    
    // Create gradient for price line
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(247, 147, 26, 0.5)');
    gradient.addColorStop(1, 'rgba(247, 147, 26, 0.0)');

    charts.price = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Bitcoin Price (USD)',
                data: prices,
                borderColor: '#f7931a',
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: '#f7931a',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 7,
                pointHoverBackgroundColor: '#ffb84d'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#b0b8d4',
                        font: { size: 12, weight: 600 }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        color: '#7a8099',
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                x: {
                    ticks: { color: '#7a8099' },
                    grid: { display: false }
                }
            }
        }
    });
}

/**
 * Initialize ETF Inflow/Outflow Chart
 * Shows capital flows in billions USD
 */
function initializeETFChart() {
    const ctx = document.getElementById('etfChart');
    if (!ctx) return;

    const { months, inflows } = generateETFData();

    charts.etf = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: 'ETF Inflow/Outflow (Billions USD)',
                data: inflows,
                backgroundColor: inflows.map(val => val >= 0 ? '#00ff88' : '#ff1744'),
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            indexAxis: 'x',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#b0b8d4',
                        font: { size: 12, weight: 600 }
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        color: '#7a8099',
                        callback: function(value) {
                            return '$' + value.toFixed(1) + 'B';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                x: {
                    ticks: { color: '#7a8099' },
                    grid: { display: false }
                }
            }
        }
    });
}

/**
 * Initialize Fear & Greed Sentiment Chart
 * Gauge-style visualization of market sentiment
 */
function initializeSentimentChart() {
    const ctx = document.getElementById('sentimentChart');
    if (!ctx) return;

    const { months, sentiment } = generateSentimentData();

    charts.sentiment = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Fear & Greed Index',
                data: sentiment,
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.3,
                pointRadius: 4,
                pointBackgroundColor: '#00d4ff',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#b0b8d4',
                        font: { size: 12, weight: 600 }
                    }
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    ticks: {
                        color: '#7a8099',
                        callback: function(value) {
                            if (value === 0) return 'Fear';
                            if (value === 50) return 'Neutral';
                            if (value === 100) return 'Greed';
                            return value;
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                x: {
                    ticks: { color: '#7a8099' },
                    grid: { display: false }
                }
            }
        }
    });
}

/**
 * Initialize Market Cycle Pie Chart
 * Shows duration of each market phase
 */
function initializeCycleChart() {
    const ctx = document.getElementById('cycleChart');
    if (!ctx) return;

    charts.cycle = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Early Bull', 'Euphoria', 'Consolidation', 'Year-End Rally', 'Correction', 'Recovery'],
            datasets: [{
                data: [3, 3, 3, 3, 1, 2],
                backgroundColor: [
                    '#00ff88',      // Green - Bullish
                    '#ffd700',      // Yellow - Euphoria
                    '#00d4ff',      // Blue - Consolidation
                    '#00ff88',      // Green - Rally
                    '#ff1744',      // Red - Correction
                    '#00ff88'       // Green - Recovery
                ],
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#b0b8d4',
                        font: { size: 11, weight: 600 },
                        padding: 15
                    }
                }
            }
        }
    });
}

/**
 * Setup Event Listeners
 * Handles interactive card animations and effects
 */
function setupEventListeners() {
    // Summary cards hover effect
    document.querySelectorAll('.summary-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Driver cards hover effect
    document.querySelectorAll('.driver-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Timeline phases hover effect
    document.querySelectorAll('.timeline-phase').forEach(phase => {
        phase.addEventListener('mouseenter', function() {
            this.style.transform = 'scaleY(1.1)';
        });
        phase.addEventListener('mouseleave', function() {
            this.style.transform = 'scaleY(1)';
        });
    });
}

/**
 * Animate Elements on Scroll
 * Triggers animations when elements come into view
 */
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

/**
 * Calculate Volatility Metric
 * Measures price volatility based on standard deviation
 */
function calculateVolatility(prices) {
    const mean = prices.reduce((a, b) => a + b) / prices.length;
    const squareDiffs = prices.map(value => Math.pow(value - mean, 2));
    const avgSquareDiff = squareDiffs.reduce((a, b) => a + b) / prices.length;
    const stdDev = Math.sqrt(avgSquareDiff);
    const volatility = (stdDev / mean) * 100;
    return volatility.toFixed(2);
}

/**
 * Calculate Moving Average
 * Technical analysis: 7-period moving average
 */
function calculateMovingAverage(prices, period = 7) {
    const moving_avg = [];
    for (let i = 0; i <= prices.length - period; i++) {
        const avg = prices.slice(i, i + period).reduce((a, b) => a + b) / period;
        moving_avg.push(Math.round(avg));
    }
    return moving_avg;
}

/**
 * Generate Market Signal
 * Returns bullish/bearish signal based on price momentum
 */
function generateMarketSignal(prices) {
    const recentPrices = prices.slice(-5);
    const currentPrice = recentPrices[recentPrices.length - 1];
    const oldPrice = recentPrices[0];
    const momentum = ((currentPrice - oldPrice) / oldPrice) * 100;
    
    if (momentum > 5) return { signal: 'Bullish', momentum: momentum.toFixed(2) };
    if (momentum < -5) return { signal: 'Bearish', momentum: momentum.toFixed(2) };
    return { signal: 'Neutral', momentum: momentum.toFixed(2) };
}

/**
 * Export Dashboard Data as JSON
 * Allows data analysis in external tools
 */
function exportDataAsJSON() {
    const { months, prices } = generatePriceData();
    const { inflows } = generateETFData();
    const { sentiment } = generateSentimentData();
    
    const exportData = {
        timestamp: new Date().toISOString(),
        market_data: {
            months,
            bitcoin_price: prices,
            etf_flows: inflows,
            sentiment_index: sentiment
        },
        analytics: {
            volatility: calculateVolatility(prices),
            moving_average: calculateMovingAverage(prices),
            market_signal: generateMarketSignal(prices),
            price_stats: {
                high: Math.max(...prices),
                low: Math.min(...prices),
                average: (prices.reduce((a, b) => a + b) / prices.length).toFixed(2),
                latest: prices[prices.length - 1]
            }
        }
    };
    
    return exportData;
}

/**
 * Display Notification Message
 * Shows temporary alerts to user
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#00ff88' : '#00d4ff'};
        color: #000;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 600;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Initialize Dashboard
 * Main initialization function - called on page load
 */
function initializeDashboard() {
    console.log('🚀 Initializing Bitcoin Market Analysis Dashboard...');
    
    // Initialize all charts
    initializePriceChart();
    initializeETFChart();
    initializeSentimentChart();
    initializeCycleChart();
    
    // Setup interactive features
    setupEventListeners();
    animateOnScroll();
    
    // Log analytics
    const { prices } = generatePriceData();
    console.log('📊 Dashboard Statistics:');
    console.log(`   - Data Points: ${prices.length}`);
    console.log(`   - Volatility: ${calculateVolatility(prices)}%`);
    console.log(`   - Market Signal: ${generateMarketSignal(prices).signal}`);
    console.log(`   - High: $${Math.max(...prices).toLocaleString()}`);
    console.log(`   - Low: $${Math.min(...prices).toLocaleString()}`);
    console.log('✅ Dashboard initialized successfully!');
}

/**
 * Keyboard Shortcut Handlers
 */
document.addEventListener('keydown', function(event) {
    // Ctrl+E / Cmd+E: Export data
    if ((event.ctrlKey || event.metaKey) && event.key === 'e') {
        event.preventDefault();
        const data = exportDataAsJSON();
        console.log('Exported Data:', data);
        showNotification('✅ Data exported to console (F12 to view)', 'success');
    }
    
    // Ctrl+R / Cmd+R: Refresh charts
    if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
        event.preventDefault();
        // Refresh all charts
        Object.values(charts).forEach(chart => {
            if (chart) chart.update();
        });
        showNotification('🔄 Charts refreshed', 'info');
    }
});

/**
 * Initialize Dashboard on Page Load
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDashboard);
} else {
    initializeDashboard();
}

// Export functions for external use
window.dashboardFunctions = {
    exportData: exportDataAsJSON,
    calculateVolatility: calculateVolatility,
    generateMarketSignal: generateMarketSignal,
    showNotification: showNotification
};
