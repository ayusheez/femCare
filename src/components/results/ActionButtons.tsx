
import React, { useState, useRef } from 'react';
import FadeIn from '@/components/FadeIn';
import Button from '@/components/Button';
import { Download, ChevronRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ActionButtons: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  
  const handleDownloadReport = async () => {
    // Get profile data from session storage
    const profileData = sessionStorage.getItem('healthProfile');
    const userInfo = sessionStorage.getItem('userInfo');
    
    if (!profileData) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No health profile data found to download",
      });
      return;
    }
    
    try {
      setIsGenerating(true);
      
      const parsedData = JSON.parse(profileData);
      const userInfoData = userInfo ? JSON.parse(userInfo) : {};
      const userName = userInfoData.name || parsedData.user?.name || 'Patient';
      
      // Create a temporary hidden div with the report content
      const reportDiv = document.createElement('div');
      reportDiv.innerHTML = generateReportHTML(parsedData, userName);
      reportDiv.style.position = 'absolute';
      reportDiv.style.left = '-9999px';
      reportDiv.style.top = '-9999px';
      document.body.appendChild(reportDiv);
      
      // Generate PDF
      const pdf = new jsPDF('p', 'pt', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      try {
        const canvas = await html2canvas(reportDiv, {
          scale: 2,
          useCORS: true,
          logging: false
        });
        
        // Add canvas to PDF
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        
        // Save the PDF
        pdf.save(`${userName.replace(/\s+/g, '_')}_Health_Report.pdf`);
        
        // Clean up
        document.body.removeChild(reportDiv);
        
        toast({
          title: "Success",
          description: "Your health report has been downloaded as PDF",
        });
      } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate your health report. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const generateReportHTML = (data: any, userName: string) => {
    // Format date
    const currentDate = new Date().toLocaleDateString();
    
    // Extract required info
    const answers = data.answers || {};
    const age = answers.age || 'Not specified';
    const exercise = answers.exercise || 'Not specified';
    const sleep = answers.sleep || 'Not specified';
    const conditions = Array.isArray(answers.conditions) ? answers.conditions.join(', ') : 'None';
    const goals = Array.isArray(answers.goals) ? answers.goals.join(', ') : 'None';
    
    // Determine user's cluster
    const userCluster = data.userCluster || 0;
    const clusters = [
      'Preventive Focus',
      'Family Planning',
      'Holistic Health',
      'Active Lifestyle',
      'Chronic Management'
    ];
    const clusterName = clusters[userCluster] || 'Not determined';
    
    // Create a formatted HTML report with light blue background
    return `
      <div style="
        background: #D3E4FD; 
        color: #000; 
        font-family: Arial, sans-serif; 
        padding: 40px; 
        min-height: 100%;
        box-sizing: border-box;
      ">
        <div style="
          background: white; 
          padding: 30px; 
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        ">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #53629E; margin: 0; font-size: 24px;">FemCare Health Profile Report</h1>
            <p style="color: #6C8EE3; font-size: 14px;">Personalized Healthcare Solutions</p>
          </div>
          
          <div style="margin-bottom: 30px;">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #E4ECF7; padding-bottom: 10px; margin-bottom: 10px;">
              <span style="font-weight: bold;">Date:</span>
              <span>${currentDate}</span>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #E4ECF7; padding-bottom: 10px; margin-bottom: 10px;">
              <span style="font-weight: bold;">Patient Name:</span>
              <span>${userName}</span>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #E4ECF7; padding-bottom: 10px; margin-bottom: 10px;">
              <span style="font-weight: bold;">Health Profile Type:</span>
              <span>${clusterName}</span>
            </div>
          </div>
          
          <div style="margin-bottom: 30px;">
            <h2 style="color: #53629E; font-size: 18px; border-bottom: 2px solid #6C8EE3; padding-bottom: 8px; margin-bottom: 15px;">
              HEALTH QUESTIONNAIRE RESPONSES
            </h2>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-weight: bold;">Age Group:</span>
              <span>${age}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-weight: bold;">Exercise Frequency (times per week):</span>
              <span>${exercise}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-weight: bold;">Sleep Quality (1-5):</span>
              <span>${sleep}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-weight: bold;">Health Conditions:</span>
              <span>${conditions || 'None reported'}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-weight: bold;">Health Goals:</span>
              <span>${goals || 'None specified'}</span>
            </div>
          </div>
          
          <div style="margin-bottom: 30px;">
            <h2 style="color: #53629E; font-size: 18px; border-bottom: 2px solid #6C8EE3; padding-bottom: 8px; margin-bottom: 15px;">
              PERSONALIZED RECOMMENDATIONS
            </h2>
            
            ${getClusterRecommendations(userCluster)}
            
            <div style="margin-top: 20px; font-style: italic; font-size: 12px; color: #666;">
              These recommendations are based on your health profile type: <strong>${clusterName}</strong>
            </div>
          </div>
          
          <div style="margin-bottom: 30px;">
            <h2 style="color: #53629E; font-size: 18px; border-bottom: 2px solid #6C8EE3; padding-bottom: 8px; margin-bottom: 15px;">
              GENERAL HEALTH RECOMMENDATIONS
            </h2>
            <ul style="padding-left: 20px;">
              <li style="margin-bottom: 8px;">
                <strong>Regular Check-ups:</strong> Schedule annual wellness visits with your healthcare provider.
              </li>
              <li style="margin-bottom: 8px;">
                <strong>Exercise:</strong> Aim for at least 150 minutes of moderate-intensity exercise per week.
              </li>
              <li style="margin-bottom: 8px;">
                <strong>Sleep:</strong> Prioritize 7-9 hours of quality sleep per night.
              </li>
              <li style="margin-bottom: 8px;">
                <strong>Nutrition:</strong> Maintain a balanced diet rich in fruits, vegetables, and whole grains.
              </li>
              <li style="margin-bottom: 8px;">
                <strong>Mental Health:</strong> Practice stress management techniques like meditation or yoga.
              </li>
            </ul>
          </div>
          
          <div style="font-size: 12px; color: #666; font-style: italic; margin-top: 40px; text-align: center;">
            This report is generated based on your self-reported information.<br>
            For medical advice, please consult with a qualified healthcare professional.
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #53629E; font-size: 12px;">
            © ${new Date().getFullYear()} FemCare - Personalized Healthcare Solutions
          </div>
        </div>
      </div>
    `;
  };
  
  const getClusterRecommendations = (clusterIndex: number) => {
    const recommendations = [
      // Preventive Focus
      `<ul style="padding-left: 20px;">
        <li style="margin-bottom: 8px;"><strong>Preventive Screenings:</strong> Schedule regular cancer screenings and health checks.</li>
        <li style="margin-bottom: 8px;"><strong>Bone Health:</strong> Consider calcium and vitamin D supplements for bone health.</li>
        <li style="margin-bottom: 8px;"><strong>Heart Health:</strong> Monitor blood pressure and cholesterol levels regularly.</li>
        <li style="margin-bottom: 8px;"><strong>Stress Reduction:</strong> Incorporate relaxation techniques into your daily routine.</li>
      </ul>`,
      
      // Family Planning
      `<ul style="padding-left: 20px;">
        <li style="margin-bottom: 8px;"><strong>Prenatal Vitamins:</strong> Consider taking folic acid supplements.</li>
        <li style="margin-bottom: 8px;"><strong>Fertility Awareness:</strong> Track your menstrual cycle for optimal timing.</li>
        <li style="margin-bottom: 8px;"><strong>Healthy Weight:</strong> Maintain a healthy BMI to support fertility.</li>
        <li style="margin-bottom: 8px;"><strong>Reproductive Health:</strong> Schedule a preconception check-up with your healthcare provider.</li>
      </ul>`,
      
      // Holistic Health
      `<ul style="padding-left: 20px;">
        <li style="margin-bottom: 8px;"><strong>Mind-Body Practices:</strong> Consider yoga, tai chi, or meditation for overall wellness.</li>
        <li style="margin-bottom: 8px;"><strong>Balanced Nutrition:</strong> Focus on whole foods and anti-inflammatory diet choices.</li>
        <li style="margin-bottom: 8px;"><strong>Sleep Hygiene:</strong> Establish a consistent sleep schedule and bedtime routine.</li>
        <li style="margin-bottom: 8px;"><strong>Digital Detox:</strong> Set boundaries with technology to reduce stress and improve focus.</li>
      </ul>`,
      
      // Active Lifestyle
      `<ul style="padding-left: 20px;">
        <li style="margin-bottom: 8px;"><strong>Cross-Training:</strong> Incorporate variety in your workout routine to prevent injury.</li>
        <li style="margin-bottom: 8px;"><strong>Recovery:</strong> Ensure adequate rest between intense workouts.</li>
        <li style="margin-bottom: 8px;"><strong>Nutrition Timing:</strong> Optimize pre and post-workout meals for performance.</li>
        <li style="margin-bottom: 8px;"><strong>Activity Tracking:</strong> Consider using a fitness tracker to monitor progress.</li>
      </ul>`,
      
      // Chronic Management
      `<ul style="padding-left: 20px;">
        <li style="margin-bottom: 8px;"><strong>Medication Adherence:</strong> Follow prescribed treatment plans consistently.</li>
        <li style="margin-bottom: 8px;"><strong>Symptom Tracking:</strong> Keep a journal of symptoms to discuss with your healthcare provider.</li>
        <li style="margin-bottom: 8px;"><strong>Condition Education:</strong> Learn about your specific health conditions and management strategies.</li>
        <li style="margin-bottom: 8px;"><strong>Support Network:</strong> Connect with support groups for your specific health concerns.</li>
      </ul>`
    ];
    
    return recommendations[clusterIndex] || recommendations[0];
  };

  return (
    <FadeIn delay={500}>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
        <Button 
          icon={<Download size={18} />} 
          iconPosition="left"
          variant="outline"
          onClick={handleDownloadReport}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating PDF...' : 'Download Full Report'}
        </Button>
        <Button 
          icon={<ChevronRight size={18} />} 
          iconPosition="right"
        >
          Schedule a Consultation
        </Button>
      </div>
    </FadeIn>
  );
};

export default ActionButtons;
