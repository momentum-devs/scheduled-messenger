#include "EventSenderImpl.h"

#include <aws/core/Aws.h>
#include <aws/events/CloudWatchEventsClient.h>
#include <aws/events/model/PutEventsRequest.h>

#include "exceptions/AwsEventSendError.h"

void EventSenderImpl::sendDeleteRecordEvent(SendEventPayload payload)
{
    Aws::CloudWatchEvents::CloudWatchEventsClient cwe;

    Aws::CloudWatchEvents::Model::PutEventsRequestEntry event_entry;
    event_entry.SetDetail(payload.body);
    event_entry.SetDetailType(payload.type);
    event_entry.AddResources(payload.resourceArn);
    event_entry.SetSource(payload.source);

    Aws::CloudWatchEvents::Model::PutEventsRequest request;
    request.AddEntries(event_entry);

    auto outcome = cwe.PutEvents(request);

    if (!outcome.IsSuccess())
    {
        throw AwsEventSendError(outcome.GetError().GetMessage());
    }
}
