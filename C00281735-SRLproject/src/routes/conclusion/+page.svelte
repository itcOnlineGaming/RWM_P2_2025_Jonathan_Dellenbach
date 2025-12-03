<script lang="ts">
  import { base } from '$app/paths';
</script>

<div class="context-container">
  <h1>THANK YOU</h1>
  <p>I am a 4th year in Computer Games Development. 
    I are working on a project called Self Regulated Learning (SRL), 
    where I need to design and develop a component under different SRL headings. 
    I am working under the heading of emotional management.</p>
  <h1>Visual Meditation Component</h1>
  <p>This component specifically is a visual meditation excercise to help visual users de-stress. 
     Users can access a guided meditation session when they need to relax.
  </p>
</div>

<div class="container">
  <div class="button-container">
    <a href={`${base}/visualOptions`} class="submit-button">Go to Component!</a>
  </div>
</div>

<style>
  .context-container {
    padding-top: 8rem;
    max-width: 600px;
    margin: 2rem auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
    text-align: center;
  }

  .container {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  .button-container {
    display: flex;
    justify-content: center;
    width: 100rem;
    max-width: 600px;
    margin-top: 3rem;
  }

  .submit-button {
    padding: 1rem 2rem;
    background-color: #69bd64;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .submit-button:hover {
    background-color: #59a155;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
</style>