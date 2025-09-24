
console.log('=== Testing Individual Imports ===');

async function testImports() {
  try {
    console.log('1. Testing User model...');
    const User = await import('./models/User');
    console.log('✓ User model imported successfully');
  } catch (error: any) {
    console.error('✗ User model failed:', error.message);
    console.error('Stack:', error.stack);
  }

  try {
    console.log('2. Testing JWT utils...');
    const jwt = await import('./utils/jwt');
    console.log('✓ JWT utils imported successfully');
  } catch (error: any) {
    console.error('✗ JWT utils failed:', error.message);
    console.error('Stack:', error.stack);
  }

  try {
    console.log('3. Testing email service...');
    const emailService = await import('./services/emailService');
    console.log('✓ Email service imported successfully');
  } catch (error: any) {
    console.error('✗ Email service failed:', error.message);
    console.error('Stack:', error.stack);
  }

  try {
    console.log('4. Testing machine service...');
    const machineService = await import('./services/machineService');
    console.log('✓ Machine service imported successfully');
  } catch (error: any) {
    console.error('✗ Machine service failed:', error.message);
    console.error('Stack:', error.stack);
  }

  try {
    console.log('5. Testing auth controller...');
    const authController = await import('./controllers/authController');
    console.log('✓ Auth controller imported successfully');
  } catch (error: any) {
    console.error('✗ Auth controller failed:', error.message);
    console.error('Stack:', error.stack);
  }

  try {
    console.log('6. Testing machine controller...');
    const machineController = await import('./controllers/machineController');
    console.log('✓ Machine controller imported successfully');
  } catch (error: any) {
    console.error('✗ Machine controller failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

testImports();