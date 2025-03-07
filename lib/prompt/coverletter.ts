import { coverLetterType } from "../validation";
function coverPrompt(data:coverLetterType) {
    const prompt = `

        Write a professional cover letter for a ${data.jobTitle} position at 
        ${data.companyName}.
        
        About the candidate:
        - Years of Experience: ${data.experience}
        - Skills: ${data.skills}
        - Professional Background: ${data.bio}
        
        Job Description:
        ${data.jobDescription}
        
        Requirements:
        1. Use a professional, enthusiastic tone
        2. Highlight relevant skills and experience
        3. Show understanding of the company's needs
        4. Keep it concise (max 400 words)
        5. Use proper business letter formatting in markdown
        6. Include specific examples of achievements
        7. Relate candidate's background to job requirements
        
        Format the letter in markdown.
    `;
}

