// Configuration file for election and campaign information
// Edit this file to customize election details

export interface ElectionInfo {
  constituencyNumber: string;
  constituencyName: string;
  constituencyNameMarathi: string;
  year: string;
  evmTitle: string;
  evmTitleMarathi: string;
  instructionText: string;
  instructionTextMarathi: string;
  votingMessage: string;
  votingMessageMarathi: string;
  votingDate: string;
  votingDateMarathi: string;
  votingTime: string;
  votingTimeMarathi: string;
}

// EDITABLE: Customize election information here
export const electionInfo: ElectionInfo = {
  constituencyNumber: "क्र.",
  constituencyName: "Local Government Elections Maharashtra",
  constituencyNameMarathi: "स्था.स्वराज्य संस्था निवडणुक महाराष्ट्र",
  year: "2025",
  evmTitle: "EVM Voting Machine",
  evmTitleMarathi: "EVM डेमो मतदान यंत्र",
  instructionText: "Press the blue button next to the election symbol for EVM voting",
  instructionTextMarathi: "डेमो मतदानासाठी कमळाच्या चिन्हा समोरील निळे बटण दाबावे",
  votingMessage: "On voting day, press the blue button in front of the election symbol for your division's all-round development",
  votingMessageMarathi: "मतदानाच्या दिवशी कसब्याच्या सर्वांगीण विकासासाठी कमळाच्या समोरील निळे बटण दाबा",
  votingDate: "Thursday, November 20, 2025",
  votingDateMarathi: "गुरूवार, दि. २० नोव्हेंबर २०२५",
  votingTime: "7:00 AM to 6:00 PM",
  votingTimeMarathi: "रोजी सकाळी ७:०० ते सायं. ६:०० पर्यंत"
};
