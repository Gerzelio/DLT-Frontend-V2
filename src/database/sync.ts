import {synchronize} from '@nozbe/watermelondb/sync';
import { database } from './index';

const SYNC_API_URL = 'http://192.168.43.244:8083/sync'; 

export async function sync({ username }) {
    await synchronize({
        database,
        pullChanges: async ({lastPulledAt}) => {
            const response = await fetch(
              `${SYNC_API_URL}?lastPulledAt=${lastPulledAt}&username=${username}`,
            );

            if (!response.ok) {
                
              throw new Error(await response.text());
            }   
      
            const {changes, timestamp} = await response.json();
       
            return {changes, timestamp};
        },
        pushChanges: async ({changes, lastPulledAt}) => {
            const response = await fetch(`${SYNC_API_URL}?username=${username}`, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({changes, lastPulledAt}),
            });
            if (!response.ok) {
      
              throw new Error(await response.text());
            }
        },
    });
}