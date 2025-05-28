'use server';

import { connectDB, SalesChannel } from '@/lib/mongoose';

export const bulkSaveSalesChannels = async (channels) => {
  try {
    if (!Array.isArray(channels) || channels.length === 0) {
      return {
        success: false,
        error: 'No valid data found in the file.',
        type: 'validation_error',
      };
    }

    await connectDB();

    const validChannels = channels.filter(
      (ch) => ch.salesChannelName && ch.salesChannelName.trim() !== ''
    );

    if (validChannels.length === 0) {
      return {
        success: false,
        error: 'No valid channels found in the file.',
        type: 'validation_error',
      };
    }

    console.log("✅ Valid records count:", validChannels.length);

    let updatedCount = 0;
    let insertedCount = 0;

    // Process each channel
    for (const channel of validChannels) {
      try {
        // Check if channel exists
        const existingChannel = await SalesChannel.findOne({ 
          salesChannelName: channel.salesChannelName 
        });

        if (existingChannel) {
          // Update existing channel
          await SalesChannel.findByIdAndUpdate(
            existingChannel._id,
            { $set: channel },
            { new: true }
          );
          updatedCount++;
        } else {
          // Insert new channel
          await SalesChannel.create(channel);
          insertedCount++;
        }
      } catch (error) {
        console.error(`Error processing channel ${channel.salesChannelName}:`, error);
      }
    }

    const message = `Successfully processed ${validChannels.length} channels. Updated: ${updatedCount}, Inserted: ${insertedCount}`;
    console.log("✅", message);

    return {
      success: true,
      message,
      updatedCount,
      insertedCount,
    };

  } catch (error) {
    console.error('❌ Bulk save failed:', error.message);
    return {
      success: false,
      error: 'Failed to process sales channels. Please try again.',
      type: 'server_error',
    };
  }
};
