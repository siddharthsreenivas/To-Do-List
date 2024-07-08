    <div class="progress-container">
        <div class="progress-bar">
            <div class="progress-circle"></div>
            <div class="progress-text">0%</div>
        </div>
    </div>

    .progress-container {
        position: absolute;
        width: 80px;
        height: 80px;
        top: 19%;
        left: 58%;
    }
    
    .progress-bar {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: conic-gradient(
            var(--text-color) 0deg,
            var(--text-color) var(--percentage),
            #ddd var(--percentage),
            #ddd 360deg
        );
    }
    
    .progress-circle {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 80%;
        height: 80%;
        background-color: #203A43;
        border-radius: 50%;
        transform: translate(-50%, -50%);
    }
    
    .progress-text {
        color: var(--text-color);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
        font-weight: bold;
        display: flex;
        flex-direction: column;
    }
    
    .progress-text span{
        font-size: 11px;
        margin-top: -8px;
    }


    const progressText = document.querySelector('.progress-text');
    const progressBar = document.querySelector('.progress-bar');

    function updateProgressBar() {
        const totalTasks = todoListArray.length;
        const completedTasks = countCompleted() ; 
        const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    
        progressText.innerHTML = `${Math.round(percentage)}% <span>Completed</span>`;
        progressBar.style.setProperty('--percentage', `${percentage * 3.6}deg`);
    }