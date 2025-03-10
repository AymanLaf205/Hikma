const { testGeminiAPI, generatePhilosophicalThought, generateArabicPhilosophicalThought } = require('./gemini');

async function runTests() {
  console.log('Testing Gemini API connection...');
  
  // Test 1: Basic API Connection
  const apiTest = await testGeminiAPI();
  console.log('\nTest 1 - API Connection:');
  console.log(apiTest.message);
  
  if (apiTest.success) {
    try {
      // Test 2: Generate English Thought
      console.log('\nTest 2 - Generating English Philosophical Thought:');
      const englishThought = await generatePhilosophicalThought();
      console.log('English:', englishThought);
      
      // Test 3: Generate Arabic Translation
      console.log('\nTest 3 - Generating Arabic Translation:');
      const arabicThought = await generateArabicPhilosophicalThought();
      console.log('Arabic:', arabicThought);
      
    } catch (error) {
      console.error('Error during content generation:', error);
    }
  }
}

// Run the tests
runTests().catch(console.error); 